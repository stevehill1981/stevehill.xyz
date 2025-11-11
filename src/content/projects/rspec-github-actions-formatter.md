---
title: "RSpec GitHub Actions Formatter"
description: "GitHub Actions was swallowing RSpec output and failing to annotate test failures. This custom formatter fixes both problems, giving you proper annotations and reliable streaming output in CI. Published as a gem, used by Ruby teams tired of fighting their CI pipeline."
technologies: ["Ruby", "RSpec", "GitHub Actions"]
status: "Published"
github: "https://github.com/stevehill1981/rspec-github-actions-formatter"
homepage: "https://rubygems.org/gems/rspec-github-actions-formatter"
priority: 4
year: 2021
---

A custom RSpec formatter that integrates with GitHub Actions, annotating test failures and solving streaming output issues with CI pipelines.

## 🎯 The Problem

When running RSpec tests in GitHub Actions, two issues made debugging failures frustrating:

### 1. No GitHub Actions Annotations
GitHub Actions can annotate failures directly in the UI, but RSpec's standard formatters don't emit the special workflow command syntax that GitHub Actions needs. Test failures appeared as generic log output instead of actionable annotations at the top of the workflow summary.

### 2. Progress Formatter Streaming Issues
RSpec's standard progress formatter (`.F*`) doesn't play nicely with how GitHub Actions buffers STDOUT. The dots appear in bursts or not at all, making long-running test suites look frozen.

## ✨ The Solution

This formatter extends RSpec's ProgressFormatter to add:

### Progress Counters
Shows test counts at the end of each line:

```
..F.*.......... [  15 /  482]
.............F. [  30 /  482]
............... [  45 /  482]
```

The line breaks and counter display work better with GitHub Actions' buffering, showing real-time progress instead of appearing all at once.

### GitHub Actions Annotations
After tests complete, outputs workflow commands for failures and pending tests:

```
::error file=spec/models/user_spec.rb,line=42,Expected user to be valid, but got invalid
::warning file=spec/services/payment_spec.rb,line=128,Not yet implemented
```

GitHub Actions parses these and displays them as:
- Annotated failures at the top of the workflow summary
- Clickable links to exact file/line locations
- Integration with PR checks

## 📦 Installation

Add to your Gemfile:
```ruby
gem 'rspec-github-actions-formatter'
```

Configure in `.rspec`:
```
--format RspecGithubActionsFormatter
```

Or run directly:
```bash
bundle exec rspec --format RspecGithubActionsFormatter
```

That's it - the progress display works everywhere, and annotations appear automatically when running in GitHub Actions.

## 🔧 How It Works

The formatter extends RSpec's `ProgressFormatter` (the standard `.F*` formatter) and:

1. **Calculates terminal width** to determine how many tests fit per line
2. **Adds line breaks** at appropriate intervals with test counters
3. **Hooks into test completion** to append annotations after the run

Key methods from the implementation:

```ruby
class RspecGithubActionsFormatter < RSpec::Core::Formatters::ProgressFormatter
  def split_progress_into_lines(_notification)
    if @examples_executed % @tests_per_line == 0 || @examples_executed == @example_count
      output.print progress_display(@examples_executed, @example_count)
      output.print "\n"
    end
  end

  def failed_example_output(example)
    message = escape_newlines(execution_result.exception.message)
    file, line = file_and_line(example.location)
    "::error file=#{file},line=#{line},#{message}"
  end
end
```

## 🎨 Actual Output

### Console Progress
```
....F.*......F............ [  25 /  482]
................F......... [  50 /  482]
.......................... [  75 /  482]
```

Each line shows:
- Standard RSpec progress characters (`.` = passed, `F` = failed, `*` = pending)
- Test counter showing current progress

### After Tests Complete
```
Failures:
  1) User validates email format
     Failure/Error: expect(user.email).to match(/@/)
       expected "invalid" to match /@/
     # ./spec/models/user_spec.rb:42

::error file=spec/models/user_spec.rb,line=42,expected "invalid" to match /@/
```

The `::error` line triggers GitHub Actions annotations.

## 📈 Why It Matters

**Problem**: GitHub Actions buffers STDOUT in chunks, so RSpec's progress formatter shows nothing for ages, then dumps everything at once. You can't tell if tests are running or hung.

**Solution**: The line breaks force STDOUT to flush regularly, showing real-time progress.

**Bonus**: GitHub Actions workflow commands provide clickable annotations for failures instead of buried log output.

## 🔍 Technical Details

- **120 lines of Ruby** (check the [source](https://github.com/stevehill1981/rspec-github-actions-formatter/blob/main/lib/rspec_github_actions_formatter.rb))
- Extends `ProgressFormatter`, not `BaseFormatter`
- Works with RSpec 3.9+
- Compatible with `parallel_tests`
- Zero dependencies beyond RSpec

The annotations are GitHub-Actions-specific, but the progress display is useful everywhere - perfect for long-running test suites on any platform.

## 🛠️ Development Story

Built in 2021 after migrating Ruby projects to GitHub Actions. The standard progress formatter's streaming issues made CI runs look frozen, and finding failures required scrolling through thousands of lines of logs.

The solution was surprisingly simple: add line breaks to force buffer flushes, and append GitHub's workflow commands for annotations. Result: a tiny gem that solves a specific pain point elegantly.

## 📄 Links

- [RubyGems](https://rubygems.org/gems/rspec-github-actions-formatter)
- [GitHub Repository](https://github.com/stevehill1981/rspec-github-actions-formatter)
- [GitHub Actions Workflow Commands](https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions)