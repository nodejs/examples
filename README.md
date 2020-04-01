# Node.js Examples

This repository is a collective of opinionated and real-world examples of how you can use Node.js to build things.

## How This Repository is Structured

This repository is structured in a specific way. Top-level directories are categories of applications - for example `CLI`, `server`, and `utility` - that enable you to find the specific _kind_ of example you're looking for. From there, subdirectories of the categories are specific modules, frameworks, or tools - for example, `yargs` is a CLI framework, both `express` and `fastify` are web frameworks, and `moment` is a utility. Inside of each of those directories exists project directories, where specific examples live. You can find a full list of these examples in the [Examples](#examples) section below.

Each example has a few things (if one doesn't, please let us know by creating an issue):

- Usable example code with comments.
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

Our baseline for all contributions is following the project's [Code of Conduct]().

### Contributing New Examples

If you'd like to contribute an example, we'd genuinely appreciate your help. , there's a few things we'll expect from any contribution of a new example:

- Correct directory structure. This means:
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

> We use All Contributors for this section of the README. Please ensure you have the `all-contributors-cli` installed if you're modifying it. See the [All Contributors CLI Usage](https://allcontributors.org/docs/en/cli/usage) documentation for details on usage.

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- ALL-CONTRIBUTORS-LIST:END -->