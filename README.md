# Thesis

This is the main repository for the written part of my Master's thesis due spring 2016.

## Installing and executing

When setting up the project, run the following commands:

```shell
# Build-specific dependencies
$ npm install

# Pandoc (for converting between formats, e.g., Markdown and PDF)
$ brew install pandoc

# Figure number references with Pandoc
$ pip install pandoc-fignos

# Use CSL spec for citation style
$ brew install pandoc-citeproc

# Allow including markdown files from other files
$ cabal install pandoc-include

# Build (From the root directory):
$ npm run build
```

Whenever you make changes, re-run (from the root directory):

```shell
$ npm run build
```

Output is in [./build](./build).

## Navigation

- Locate TODOs: `grep -ri TODO .`
