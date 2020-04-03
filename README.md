# Node.js Examples

This repository is a collective of opinionated and real-world examples of how you can use Node.js to build things.

## How This Repository is Structured

This repository is structured in a specific way:

- **Top-level directories** are **category directories** of applications - for example `CLI`, `server`, and `utility` - that enable you to find the specific _kind_ of example you're looking for.
- **Second-level directories** are **project directories** named after specific modules, frameworks, platforms, or tools - for example, `yargs` is a CLI framework, both `express` and `fastify` are web frameworks, and `moment` is a utility.
- **Third-level directories** are **example directories**, where specific examples live. You can find a full list of these examples in the [Examples](#examples) section below.

Here is an example of the structure:

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

We genuinely appreciate folks who are trying to help out by lowering the barrier to understanding Node.js 🤗

Our baseline for all contributions is following the project's [Code of Conduct](./CODE_OF_CONDUCT.md).

### Contributing New Examples

If you'd like to contribute an example, we'd genuinely appreciate your help. There's a few things we'll expect from any contribution of a new example:

- If the example is of a new category or project, the appropriate new directories should be created in addition to the necessary example directory. This means:
  - If someone wanted to contribute an `express` example and there was no top level category that it fit within, creating a `servers` directory with an `express` subdirectory would be needed.
  - If someone wanted to create `fastify` example after the `servers` directory had already been created, creating a `fastify` directory within the `servers` category would be needed.
- Usable example code. This means:
  - Comprehensive comments.
  - Descriptive and readable variable names.
  - Modern JavaScript.
- We use Jest for testing. Examples' tests should check these boxes:
  - Tests should be written for all code that can be tested.
  - Tests should be in the format of `<name-of-file-being-tested>.test.js` and should live alongside the files they're testing.
- Proper documentation. This means:
  - A README.md that explains what the example does and how to use it, plus documents the examples dependencies.
  - The README should include a title, description, instructions for usage, and instructions for running the test.

### Contributing to Tests

We're always willing to take on more tests or improvements to our existing tests. We use Jest, and actively leverage the `onlyChanged` flag to reduce nosie in our CI.

### Contributing to Prose

This repository has a non-trivial amount of written content. If you're interested in helping provide clarity and context or otherwise improving our prose, we welcome your contributions.

### Thank You To Our Contributors

> We use All Contributors for this section of the README. Please ensure you have the `all-contributors-cli` installed if you're modifying it. See the [All Contributors CLI Usage](https://allcontributors.org/docs/en/cli/usage) documentation for details on usage. See the [emoji key](https://allcontributors.org/docs/en/emoji-key) for details on what each emoji represents.

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://bnb.im"><img src="https://avatars3.githubusercontent.com/u/502396?v=4" width="100px;" alt=""/><br /><sub><b>Tierney Cyren</b></sub></a><br /><a href="https://github.com/node/examples/commits?author=bnb" title="Code">💻</a> <a href="#content-bnb" title="Content">🖋</a> <a href="https://github.com/node/examples/commits?author=bnb" title="Documentation">📖</a> <a href="https://github.com/node/examples/commits?author=bnb" title="Tests">⚠️</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->