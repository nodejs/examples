# copyAndDelete

This is a CLI built with [commander](https://www.npmjs.com/package/commander). You can copy files to a specific directory path and delete the specified path and its sub-files/folders.

## Usage

Here is the output of running `node bin/cli.js -h` from the `copyAndDelete` directory:

```bash
Usage: cli.js [file] [path]

Options:
  --help, -h       Show help                                           [boolean]
  --version, v     Show version number                                 [boolean]
```

### As a Local Project

You'll want to start by installing dependencies:

```bash
npm install
```

Since this is a CLI, you'll probably want to get it available on your PATH. There's two ways you can do this:

**Via global installation:**

```bash
npm i -g . # this will install the current working directory as a global module. you will want to do npm uninstall -g . to uninstall it.
copyAndDelete copy [file] [path] # run the CLI
copyAndDelete rimraf [path] # run the CLI
```

**Via symlink:**

```bash
npm link # this will create a symlink that makes the module act as a global module. npm unlink to remove this.
copyAndDelete copy [file] [path] # run the CLI
copyAndDelete rimraf [file] # run the CLI
```
