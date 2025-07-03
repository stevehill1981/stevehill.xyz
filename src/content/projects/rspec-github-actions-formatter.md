---
title: "RSpec GitHub Actions Formatter"
description: "A custom RSpec formatter designed for GitHub Actions that provides proper test annotations and solves streaming output issues in CI environments."
technologies: ["Ruby", "RSpec", "GitHub Actions"]
status: "Published"
repository: "https://github.com/stevehill1981/rspec-github-actions-formatter"
homepage: "https://rubygems.org/gems/rspec-github-actions-formatter"
priority: 4
year: 2021
---

# RSpec GitHub Actions Formatter

A focused, practical Ruby gem that solves a specific problem: making RSpec output work better with GitHub Actions CI/CD pipelines.

## The Problem

When running RSpec tests in GitHub Actions, two main issues arise:
1. Failing and pending specs don't get properly annotated in the GitHub Actions interface
2. Standard RSpec formatters have streaming issues with GitHub Actions' STDOUT handling

## The Solution

This custom formatter provides:
- **Proper GitHub Actions Annotations**: Failing and pending specs are correctly annotated in the GitHub Actions UI
- **Stream-Friendly Output**: Designed to work well with GitHub Actions' approach to streaming STDOUT
- **Useful Progress Display**: Clear test progress indication regardless of where you run the tests

## Usage

Install the gem:
```ruby
gem 'rspec-github-actions-formatter'
```

Configure RSpec to use it by adding to your `.rspec` file:
```
--format RspecGithubActionsFormatter
```

Or use it directly:
```bash
bundle exec rspec --format RspecGithubActionsFormatter
```

## Technical Approach

The formatter integrates with RSpec 3.9+ and provides annotations in the specific format that GitHub Actions expects. While the annotations are most useful in CI environments, the progress display is beneficial for local development as well.

## Impact

This gem addresses a common pain point for Ruby developers using GitHub Actions for CI/CD, making test failures more visible and easier to debug directly in the GitHub interface.

Published on RubyGems and available as open source under the MIT license.