---
title: "NetNodes Platform Development"
description: "Leading development on a 15+ service access control platform. Orchestrated zero-downtime migrations from legacy servers to Docker to Kubernetes, upgraded PostgreSQL 11→17 with TimescaleDB, and built the automation to keep it all running. Enterprise Rails at scale."
technologies: ["Ruby on Rails", "Python", "TimescaleDB", "PostgreSQL", "Redis", "Kubernetes", "Docker", "Ansible"]
status: "Ongoing"
priority: 1
year: 2024
---

Leading development on an access control platform consisting of 15+ interconnected services. The system provides enterprise-grade access management with hardware device integration, built primarily in Ruby on Rails with Python-based device services.

## The Work

The biggest initiative has been migrating the entire platform from legacy servers to a modern containerised stack — first to Docker, then to Kubernetes — across all 15+ services with zero downtime. This included a PostgreSQL 11 → 17 upgrade with TimescaleDB extension migration, which required careful planning around extension compatibility and data continuity.

Day-to-day work spans full-stack Rails development, API design (with OpenAPI specs and generated client SDKs), and infrastructure automation via Ansible playbooks and GitHub Actions CI/CD pipelines. The platform is multi-tenant with SAML/LDAP integration for enterprise customers.

## Technical Stack

**Rails 8** (multi-service ecosystem), **PostgreSQL 17** with **TimescaleDB**, **Redis** for inter-service communication and background jobs, **Kubernetes** for orchestration, **Ansible** for infrastructure automation, **Python** for hardware device integration.
