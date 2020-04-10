# countEntriesInDirectory

This is a CLI built with [yargs](https://www.npmjs.com/package/yargs) that searches the directory (path) passed to it and then spits out how many entries (files and directories) are within _that directory_. It does not recursively search additional directories within it.

## Usage

Here is the output of running `node bin/cli.js -h` from the `countEntriesInDirectory` directory:

```bash
Usage: cli.js --directory=[path to a directory]

Options:
  --help           Show help                                           [boolean]
  --version        Show version number                                 [boolean]
  --directory, -d  the directory to count files within.               [required]
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
count-entries-in-directory --directory=. # run the CLI
```

**Via symlink:**

```bash
npm link # this will create a symlink that makes the module act as a global module. npm unlink to remove this.
count-entries-in-directory --directory=. # run the CLI
```

### As a Module Published to npm

If you were to pulbish this CLI to npm, there'd be two ways you'd use it from the registry with npm (let's assume you published as `count-entries-in-directory`):

```bash
npm i -g count-entries-in-directory # this would install the module from the registry and make it globally available
count-entries-in-directory --directory=. # run the CLI
```

```bash
npx count-entries-in-directory --directory=. # this would temporarily download the module, run the first entry in `bin` of package.json and pass along any additional arguments like `--directory=.`
```
