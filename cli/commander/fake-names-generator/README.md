# fake-names-generator

CLI built with [commander](https://www.npmjs.com/package/commander) to generate fake names using [Chance](https://www.npmjs.com/package/chance)

## Usage

Here is the output of running `node bin/cli.js -h` from the `fake-names-generator` directory:

```bash
Usage: fake-names-generator <option>

CLI built with [commander](https://www.npmjs.com/package/commander) to generate fake names using [Chance](https://www.npmjs.com/package/chance)

Options:
  -V, --version            output the version number
  -n, --nameType <option>  name (default: "fullName")
  -t, --times <option>     number of times (default: 1)
  -i --info                info (default: false)
  -s --save                save as json (default: false)
  -h, --help               display help for command

Example usages:
        $ fake-names-generator -n firstName     # generates a first name
        $ fake-names-generator -n lastName      # generates a last name
        $ fake-names-generator -t 5             # generates 5 full names
        $ fake-names-generator -s               # generates a full name also saves the result as json file
        $ fake-names-generator -i               # gives extra log info during name generation
```

### As a Local Project

You'll want to start by installing dependencies:

```bash
npm install
```

Since this is a CLI, you'll probably want to get it available on your PATH. There's two ways you can do this:

**Via global installation:**

```bash
npm i -g # this will install the current working directory as a global module.
fake-names-generator # run the CLI
```

You may want to run `npm uninstall -g` from the project directory to uninstall it.

**Via symlink:**

```bash
npm link # this will create a symlink that makes the module act as a global module.
fake-names-generator # run the CLI
```

`npm unlink` to remove this.

### As a Module Published to npm

If you were to pulbish this CLI to npm, there'd be two ways you'd use it from the registry with npm (let's assume you published as `fake-names-generator`):

```bash
npm i -g fake-names-generator # Install the module from the registry & make it globally available

fake-names-generator # run the CLI
```

```bash
npx fake-names-generator # this would temporarily download the module, run the first entry in `bin` of package.json and pass along any additional arguments like `--save`
```

## Tests

```bash
npm test
```
