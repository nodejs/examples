# Node.js Examples

This repository is a collective of opinionated and real-world examples of how you can use Node.js to build things.

## How This Repository is Structured

This repository is structured in a specific way:

- **Top-level directories** are **category directories** of applications - for example `CLI`, `server`, and `utility` - that enable you to find the specific _kind_ of example you're looking for.
- **Second-level directories** are **project directories** named after specific modules, frameworks, platforms, or tools - for example, `yargs` is a CLI framework, both `express` and `fastify` are web frameworks, and `moment` is a utility.
- **Third-level directories** are **example directories**, where specific examples live. You can find a full list of these examples in the [Examples](#examples) section below.

Here is an example of the structure in general terms:

```text
- examples (root)
  - category
    - project
      - example
  - category
    - project
      - example
      - example
      - example
    - project
      - example
      - example
  - category
    - project
      - example
    - project
      - example
      - example
```

Each **example** has a few properties (if one doesn't, please [let us know](https://github.com/nodejs/examples/issues/new)):

- Usable example code.
- Passing tests.
- A README.md that explains what the example does and how to use it.

## Examples

### CLI

Command Line Interfaces (CLIs) are tools that can be accessed exclusively from the command line that generally serve some utility. There is a vibrant community of Node.js CLI utilities, ranging from packages to make it slightly easier to accomplish something to full frameworks for building CLI experiences.

- [CLI](./cli)
  - [yargs](./cli/yargs)
    - [countEntriesInDirectory](./cli/yargs/countEntriesInDirectory): A small command line tool that shows how to use yargs and Node.js together, leveraging Node.js's `path` and `fs` modules to read a directory passed by the CLI user

## Contributing

We've documented how to meaningfully contribute in [CONTRIBUTING.md](./CONTRIBUTING.md) 🤗

### Thank You To Our Contributors

> We use All Contributors for this section of the README. Please ensure you have the `all-contributors-cli` installed if you're modifying it. See the [All Contributors CLI Usage](https://allcontributors.org/docs/en/cli/usage) documentation for details on usage. See the [emoji key](https://allcontributors.org/docs/en/emoji-key) for details on what each emoji represents.

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://bnb.im"><img src="https://avatars3.githubusercontent.com/u/502396?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Tierney Cyren</b></sub></a><br /><a href="https://github.com/node/examples/commits?author=bnb" title="Code">💻</a> <a href="#content-bnb" title="Content">🖋</a> <a href="https://github.com/node/examples/commits?author=bnb" title="Documentation">📖</a> <a href="https://github.com/node/examples/commits?author=bnb" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/mcollina"><img src="https://avatars0.githubusercontent.com/u/52195?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Matteo Collina</b></sub></a><br /><a href="#infra-mcollina" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#ideas-mcollina" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="https://thiru.xyz/"><img src="https://avatars1.githubusercontent.com/u/7230720?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Thiru</b></sub></a><br /><a href="#example-Thiruppathi" title="Examples">💡</a> <a href="#maintenance-Thiruppathi" title="Maintenance">🚧</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->