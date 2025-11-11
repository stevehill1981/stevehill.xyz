---
title: "Open Source Contributions"
description: "Fixed MySQL check constraint bugs in Rails core, enhanced TimescaleDB schema dumping for multi-column compression, and debugged HTML Pipeline's node filter merging. Real-world problems found in production, fixed upstream for everyone."
technologies: ["Ruby", "Rails", "MySQL", "PostgreSQL", "TimescaleDB", "HTML Processing"]
status: "Ongoing"
priority: 1
year: 2022
---

Selected contributions to major open source projects where I encountered bugs in production, tracked down root causes, and submitted fixes that benefit the entire Ruby community.

## 🎯 Ruby on Rails Core

### MySQL Check Constraints Schema Dumping ([PR #53619](https://github.com/rails/rails/pull/53619))
**Merged November 2024**

#### The Problem

A constraint with embedded newlines in MySQL 8.0.16+:

```sql
json_schema_valid(_utf8mb4'\n        {\n          "oneOf": [\n...
```

Was being dumped as **invalid SQL** with literal `n` characters instead of properly stripped whitespace:

```sql
json_schema_valid(_utf8mb4'n {n "oneOf": [n {n "type": "null"n }...
```

This completely broke schema restoration. You'd get a valid schema dump from your database, but attempting to load it would fail with syntax errors.

#### The Root Cause

My earlier PR #47851 (see below) attempted to fix whitespace stripping using a regex pattern, but the regex was incorrectly specified. Instead of removing newline characters, it was leaving the letter `n` behind.

Classic regex mistake: the pattern wasn't properly escaping the newline sequence.

#### The Solution

Replaced the faulty regex approach with simple string manipulation:

```ruby
# Before (broken regex)
check_expression.gsub(/[\n]/, ' ').squeeze(' ').strip

# After (reliable string operations)
check_expression.gsub("\n", ' ').squeeze(' ').strip
```

Now the same constraint dumps cleanly:

```sql
json_schema_valid(_utf8mb4' { "oneOf": [ { "type": "null" }...
```

#### Impact

- Fixed schema dump reliability for **all** MySQL 8.0.16+ databases with complex check constraints
- Prevented production deployment failures when restoring schemas
- Lesson learned: when fixing a bug in your own previous fix, maybe skip the regex next time

---

### MySQL Schema Dumper Character Stripping ([PR #47851](https://github.com/rails/rails/pull/47851))
**Merged April 2023** • **My first Rails core contribution** 🎉

#### The Problem

MySQL **8.0.16 changed its behavior** around check constraints. Prior versions wrapped constraints in extra parentheses:

```sql
-- MySQL < 8.0.16
((column > 0))

-- MySQL >= 8.0.16
(column > 0)
```

Rails was **blindly stripping the first and last characters** from all constraints, regardless of MySQL version. This worked fine before 8.0.16 (removing the extra outer parens), but broke after:

```ruby
# Original constraint
check "email LIKE '%@%'"

# After Rails stripped first/last chars
check "mail LIKE '%@%"
```

The closing quote and paren were gone. Schema dumps became invalid and couldn't be restored.

#### The Solution

Added version detection to handle MySQL 8.0.16+ correctly:

```ruby
def prepare_check_constraint_for_schema_dump(expression)
  # Only strip outer parens if MySQL < 8.0.16
  if database_version < "8.0.16"
    expression = expression[1..-2] if expression.start_with?("(") && expression.end_with?(")")
  else
    # For 8.0.16+, strip parens only if double-wrapped
    expression = expression[1..-2] if expression.start_with?("((") && expression.end_with?("))")
  end

  # Also strip whitespace and newlines
  expression.gsub(/[\n]/, ' ').squeeze(' ').strip
end
```

Now schema dumps work correctly across MySQL versions.

#### Impact

- Unblocked Rails users upgrading to MySQL 8.0.16+
- Backported to `7-0-stable` branch after production reports
- Led to discovering the newline bug that required PR #53619 (see above)

## 📊 TimescaleDB Ruby Gem

### Multi-Column Compression Schema Support ([PR #38](https://github.com/timescale/timescaledb-ruby/pull/38))
**Merged January 2023**

#### The Problem

TimescaleDB supports **multiple columns** for both compression segmentation and ordering, but the Ruby gem's schema dumper was only capturing the **first column**. This caused silent data loss during schema restoration.

Example configuration that would break:

```ruby
create_table :sensor_data, hypertable: { time_column: 'created_at' } do |t|
  t.string :device_id
  t.string :location
  t.float :temperature
  t.datetime :created_at
end

# Enable compression with multiple segmentation columns
execute <<-SQL
  ALTER TABLE sensor_data SET (
    timescaledb.compress,
    timescaledb.compress_segmentby = 'device_id, location',
    timescaledb.compress_orderby = 'created_at DESC NULLS FIRST, temperature DESC NULLS LAST'
  );
SQL
```

When dumping the schema, the gem would output:

```ruby
compress_segmentby: "device_id"              # Missing 'location'
compress_orderby: "created_at DESC"          # Missing 'temperature' and NULLS handling
```

Restoring this schema would create a **differently configured** compression setup, affecting query performance and storage efficiency.

#### The Solution

Enhanced the schema dumper to:

1. Capture **all** segmentation columns, not just the first
2. Parse **all** ordering columns with their direction (ASC/DESC)
3. Handle PostgreSQL's `NULLS FIRST` / `NULLS LAST` ordering correctly

Key implementation detail: PostgreSQL has implicit NULLS handling defaults:
- `ORDER BY column ASC` → defaults to `NULLS LAST`
- `ORDER BY column DESC` → defaults to `NULLS FIRST`

The schema dumper now only includes explicit NULLS directives when they differ from the defaults, keeping schema files clean.

#### Impact

- Schema dumps now **perfectly replicate** complex compression configurations
- Eliminated subtle performance regressions caused by incorrect schema restoration
- Comprehensive test coverage validates multi-column handling

---

### Hypertable Dimensions Bug Fix ([PR #30](https://github.com/timescale/timescaledb-ruby/pull/30))
**Merged October 2022**

#### The Problem

The `timescale_hypertable` helper method was attempting to access dimension properties directly on a collection proxy:

```ruby
hypertable.dimensions.time_column  # NoMethodError: undefined method for collection
```

This crashed when trying to create hypertables in migrations, making the gem's helper methods completely unusable.

#### The Solution

Fixed the code to select the first dimension explicitly:

```ruby
hypertable.dimensions.first.time_column  # Works correctly
```

TimescaleDB hypertables always have a primary time-based dimension, so accessing `.first` is safe and expected.

#### Impact

Restored functionality to `timescale_hypertable` migrations helper, unblocking users who had upgraded to the broken version.

## 🔍 HTML Pipeline

### NodeFilter Array Merging Fix ([PR #389](https://github.com/gjtorikian/html-pipeline/pull/389))
**Merged December 2023** • Shipped as v3.0.1

#### The Problem

The weirdest kind of bug: one that exhibits a **pattern** but not a reason.

When configuring NodeFilter instances for HTML processing:
- **0 filters**: ✅ Works
- **1 filter**: ✅ Works
- **2 filters**: ✅ Works
- **3 filters**: ❌ `ArgumentError` crashes
- **4 filters**: ✅ Works again

Classic symptom of array flattening issues. The library was treating NodeFilter results as **2-element pairs** during the merge operation, which broke with odd numbers.

This was a regression in html-pipeline 3.0.0 that made certain filter configurations completely unusable.

#### The Root Cause

Ruby's array handling was interpreting the merge operation as a sequence of 2-element arrays. When you had 3 filters, Ruby tried to pair them as `[filter1, filter2]` and `[filter3, ???]`, causing the `ArgumentError`.

The code was essentially doing:

```ruby
# Broken: treats results as pairs
results.each_slice(2) do |a, b|
  merge(a, b)  # Crashes when b is nil (odd number of items)
end
```

#### The Solution

Fixed the array processing to handle **any number** of filters:

```ruby
# Corrected: properly merges all results
results.reduce do |merged, current|
  merge(merged, current)
end
```

Now filter counts don't matter - merge operations work consistently regardless of configuration.

#### Impact

- Fixed html-pipeline 3.0.0 regression
- Shipped as 3.0.1 within days
- Maintainer response: *"Gah, thanks for catching this"* (we've all been there)

---

## 🎯 Contribution Philosophy

All of these started the same way: **I hit a bug in production**, spent time debugging it, found the root cause, and fixed it upstream so nobody else has to deal with it.

### The Pattern

1. **Production breaks** with a cryptic error
2. **Debug relentlessly** - read source code, write reproduction cases, trace through the call stack
3. **Fix it locally** first to unblock production
4. **Submit upstream** with comprehensive tests and clear explanation
5. **Collaborate with maintainers** through review process
6. **Ship the fix** for everyone

### What This Demonstrates

**Database expertise** - Deep understanding of MySQL version differences, PostgreSQL ordering semantics, and TimescaleDB compression internals

**Edge case hunting** - Finding bugs that only surface under specific version combinations or configuration patterns

**Code archaeology** - Reading unfamiliar codebases quickly to understand intent vs. implementation

**Testing discipline** - Every PR includes comprehensive test coverage validating the fix

**Communication** - Writing clear bug reports and explanations for maintainers who don't have your context

## 📊 Impact

These aren't vanity contributions. Each one fixed a **real production problem** that affected multiple teams:

- **Rails MySQL fixes**: Thousands of applications upgrading to MySQL 8.0.16+ can now dump and restore schemas reliably
- **TimescaleDB enhancements**: Time-series applications using compression get accurate schema dumps
- **HTML Pipeline fix**: Anyone using 3+ NodeFilters in html-pipeline 3.0.0 can now upgrade to 3.0.1

The best open source contributions aren't the flashy ones. They're the unglamorous bug fixes that prevent the next developer from wasting hours on the same problem you already solved.

## 🔗 All Contributions

- [Ruby on Rails PR #53619](https://github.com/rails/rails/pull/53619) - MySQL check constraints newline handling
- [Ruby on Rails PR #47851](https://github.com/rails/rails/pull/47851) - MySQL 8.0.16+ schema dumper fix
- [TimescaleDB Ruby PR #38](https://github.com/timescale/timescaledb-ruby/pull/38) - Multi-column compression support
- [TimescaleDB Ruby PR #30](https://github.com/timescale/timescaledb-ruby/pull/30) - Hypertable dimensions fix
- [HTML Pipeline PR #389](https://github.com/gjtorikian/html-pipeline/pull/389) - NodeFilter merging fix