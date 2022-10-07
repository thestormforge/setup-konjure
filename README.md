# 🧙‍ Setup Konjure

[![Tests](https://github.com/thestormforge/setup-konjure/actions/workflows/test.yml/badge.svg)](https://github.com/thestormforge/setup-konjure/actions/workflows/test.yml)

This action configures your GitHub Actions Runner to use the Konjure CLI.

# Usage

```yaml
steps:
- uses: thestormforge/setup-konjure@v1
  with:
    # Version of the Konjure CLI to install.
    version:
      latest
```
