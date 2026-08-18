# @simurgh-ui/cli

Install Simurgh UI component source into React, Vue, or Angular applications. Generated source
belongs to the application and can be inspected, edited, and versioned locally.

> Simurgh UI is pre-release. Review generated diffs before overwriting customized components.

## Quick start

```sh
pnpm dlx @simurgh-ui/cli init
pnpm dlx @simurgh-ui/cli add button dialog
```

`init` detects the framework from the application's `package.json`, installs the required runtime
packages, creates `simurgh.json`, and copies the token stylesheet and recipe index. Each `add`
command copies only the selected component recipes into `styles/simurgh/components/` and updates
the index. A framework can also be selected explicitly:

```sh
pnpm dlx @simurgh-ui/cli init --framework react
pnpm dlx @simurgh-ui/cli init --framework vue --skip-install
pnpm dlx @simurgh-ui/cli init --framework angular
```

## Commands

| Command                          | Purpose                                                         |
| -------------------------------- | --------------------------------------------------------------- |
| `simurgh init`                   | Initialize Simurgh in the current application.                  |
| `simurgh list`                   | List available registry components.                             |
| `simurgh add [components...]`    | Copy selected components, or the complete catalog when omitted. |
| `simurgh add dialog --overwrite` | Replace an existing generated component.                        |
| `simurgh diff [component]`       | Compare local source with the bundled registry.                 |

React and Vue source is written under `src/components/ui` when a `src` directory exists, or under
`components/ui` otherwise. Angular source is written under `src/app/components/ui`.
