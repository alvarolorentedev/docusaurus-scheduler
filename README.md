# ![docusaurus scheduler2](https://github.com/alvarolorentedev/docusaurus-scheduler/assets/3071208/efa7646d-318c-4e6c-8b08-d473ab50fbe0) Docusaurus Scheduler

A docusarus compatible github action to schedule article releases

## Usage

Here's an example of how to use this action in a workflow file:

```yaml
name: Example Workflow

on:
  workflow_dispatch:

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      #use this action
      - uses: alvarolorentedev/docusaurus-scheduler@main
        with:
          base-folder: ./scheduler
          destination-folder: ./blog
      #Optional - recommended: commit changes
      - uses: EndBug/add-and-commit@v9
        with:
          default_author: github_actions
          message: '[skip ci] Moved scheduled articles'
```

## Inputs

| Input          | Default | Description                     |
| -------------- | ------- | ------------------------------- |
| `base-folder` | `./scheduler` | the folder for the drafts and unpublished articles |
| ` destination-folder` | `./blog` | the folder for the publised articles |


