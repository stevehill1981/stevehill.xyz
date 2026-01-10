---
title: "SitemapGenerator Cache Adapter"
description: "The sitemap_generator gem writes files to disk, which doesn't work on Kubernetes or Heroku. This adapter stores sitemaps in Rails.cache instead, making them work seamlessly with ephemeral storage and multi-pod deployments. Published as a gem for Rails teams running on modern infrastructure."
technologies: ["Ruby", "Rails", "Kubernetes"]
status: "Published"
github: "https://github.com/stevehill1981/sitemap_generator-cache_adapter"
homepage: "https://rubygems.org/gems/sitemap_generator-cache_adapter"
priority: 4
year: 2026
---

A cache-based storage adapter for the sitemap_generator gem that stores sitemaps in `Rails.cache` instead of the filesystem.

## 🎯 The Problem

The popular [sitemap_generator](https://github.com/kjvarga/sitemap_generator) gem writes sitemaps to disk by default. This works fine on traditional servers but breaks on modern infrastructure:

### Kubernetes Deployments
Pods have ephemeral storage - files written during one request might not exist for the next. Sitemaps vanish when pods restart or scale.

### Heroku and Serverless
Read-only or ephemeral filesystems mean sitemap files can't be written at all, or disappear on dyno restart.

### Multi-Pod Deployments
Even with persistent storage, each pod has its own filesystem. A sitemap generated on pod A isn't visible to pod B serving the next request.

The standard workarounds (S3 adapter, shared NFS) add complexity and external dependencies for what should be a simple feature.

## ✨ The Solution

Store sitemaps in `Rails.cache` instead of the filesystem. When using a shared cache backend like [Solid Cache](https://github.com/rails/solid_cache) (database-backed) or Redis, sitemaps are:

- **Persistent** across pod restarts and deploys
- **Shared** across all application instances
- **Simple** - no external storage services needed

## 📦 Installation

Add to your Gemfile:
```ruby
gem "sitemap_generator"
gem "sitemap_generator-cache_adapter"
```

Configure in `config/sitemap.rb`:
```ruby
SitemapGenerator::Sitemap.default_host = "https://example.com"
SitemapGenerator::Sitemap.adapter = SitemapGenerator::CacheAdapter.new
SitemapGenerator::Sitemap.compress = false
SitemapGenerator::Sitemap.create_index = false

SitemapGenerator::Sitemap.create do
  add "/about", changefreq: "monthly"
  add "/contact", changefreq: "monthly"
end
```

Create a controller to serve sitemaps:
```ruby
class SitemapsController < ApplicationController
  def show
    xml = SitemapGenerator::CacheAdapter.fetch("sitemap.xml") do
      load Rails.root.join("config", "sitemap.rb")
    end
    xml.present? ? render(xml: xml) : head(:not_found)
  end
end
```

Add the route:
```ruby
get "sitemap.xml", to: "sitemaps#show", defaults: { format: :xml }
```

## 🔧 How It Works

The adapter implements sitemap_generator's adapter interface with a single `write` method that stores data in the cache:

```ruby
def write(location, raw_data)
  cache_key = "#{self.class.cache_key_prefix}:#{location.filename}"
  self.class.cache_store.write(cache_key, raw_data, expires_in: self.class.expires_in)
end
```

The `fetch` class method handles lazy regeneration:

```ruby
def self.fetch(filename, &block)
  cache_store.fetch(cache_key, expires_in: expires_in) do
    yield if block_given?
    cache_store.read(cache_key)
  end
end
```

On cache miss, the block runs (loading `config/sitemap.rb`, which calls `create`), the sitemap gets written to cache, and subsequent requests serve from cache until expiration.

## 🎨 Features

### Lazy Regeneration
Sitemaps regenerate automatically when the cache expires. No cron jobs or scheduled tasks needed - the first request after expiration triggers regeneration.

### Configurable
```ruby
SitemapGenerator::CacheAdapter.new(
  cache_key_prefix: "myapp:sitemap",  # Default: "sitemap_generator"
  expires_in: 12.hours,                # Default: 24.hours
  cache_store: Rails.cache             # Default: Rails.cache
)
```

### Class Methods for Cache Management
```ruby
SitemapGenerator::CacheAdapter.read("sitemap.xml")
SitemapGenerator::CacheAdapter.exist?("sitemap.xml")
SitemapGenerator::CacheAdapter.delete("sitemap.xml")
SitemapGenerator::CacheAdapter.clear_all
```

### Multiple Sitemap Support
For large sites (50k+ URLs), the adapter handles multiple files and sitemap indexes - just update the controller to serve dynamic filenames.

## 📈 Why It Matters

**Before**: Workarounds involving S3 buckets, shared NFS mounts, or accepting that sitemaps don't work properly on Kubernetes.

**After**: Sitemaps just work. Store them in the same cache backend you're already using for everything else.

## 🔍 Technical Details

- **~200 lines of Ruby** (check the [source](https://github.com/stevehill1981/sitemap_generator-cache_adapter/blob/main/lib/sitemap_generator/cache_adapter.rb))
- Works with any Rails cache backend (Solid Cache, Redis, Memcached)
- Compatible with sitemap_generator 6.x+
- Supports Ruby 3.1+
- Full test suite with RSpec
- CI via GitHub Actions

## 🛠️ Development Story

Built in January 2026 while migrating Rails marketing sites to Kubernetes. The sites used sitemap_generator with the default file adapter, which broke immediately on ephemeral pod storage.

Rather than add S3 complexity for a few XML files, storing sitemaps in Solid Cache (already in use) was the obvious solution. The adapter took an afternoon to build, test, and publish - a focused tool solving a specific infrastructure problem.

## 📄 Links

- [RubyGems](https://rubygems.org/gems/sitemap_generator-cache_adapter)
- [GitHub Repository](https://github.com/stevehill1981/sitemap_generator-cache_adapter)
- [sitemap_generator gem](https://github.com/kjvarga/sitemap_generator)
- [Solid Cache](https://github.com/rails/solid_cache)
