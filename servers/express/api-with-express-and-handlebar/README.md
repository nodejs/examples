# API with Express & Handlebar Templates

> Use Express.js to create three (3) routes that consume the [API](https://nodejs.org/dist/index.json)

## Installation Instructions

### To run the application

```bash
npm start
```

### To run the tests

```bash
npm test
```

## Goals

1. Fetch data from an API and serve JSON content as response
2. Render out data using dynamic template files
3. Identify and write useful tests

### Routes

#### GET - dependencies

This will retrieve all dependencies from the `package.json` and render HTML using handlebars.

##### Example Response - `/dependencies`

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8" />
    <title></title>
  </head>
  <body>
    <ul>
      <li>bent - ^7.3.7</li>
      <li>express - ^4.17.1</li>
      <li>hbs - ^4.1.1</li>
      <li>semver - ^7.3.2</li>
    </ul>
  </body>
</html>
```

#### GET - `/api/minimum-secure`

This will return the minimum secure version for each release line as JSON. In other words, what is the highest version of each line that has `security: true`.

##### Example Response `/api/minimum-secure`

```json
{
   "v0": {
       "version": "v0.12.17",
       "date": "2016-10-18",
       "files": [],
       "npm": "2.15.1",
       "v8": "3.28.71.19",
       "uv": "1.6.1",
       "zlib": "1.2.8",
       "openssl": "1.0.1u",
       "modules": "14",
       "lts": false,
       "security": true
   },
   "v4": {
       "version": "v4.9.0",
       "date": "2018-03-28",
       "files": [],
       "npm": "2.15.11",
       "v8": "4.5.103.53",
       "uv": "1.9.1",
       "zlib": "1.2.11",
       "openssl": "1.0.2o",
       "modules": "46",
       "lts": "Argon",
       "security": true
   }
}
```

#### GET - `/api/latest-releases`

This will return the latest release version in each release line as JSON.

##### Example Response `/api/latest-releases`

```json
{
  "v14": {
      "version": "v14.7.0",
      "date": "2020-07-29",
      "files": [],
      "npm": "6.14.7",
      "v8": "8.4.371.19",
      "uv": "1.38.1",
      "zlib": "1.2.11",
      "openssl": "1.1.1g",
      "modules": "83",
      "lts": false,
      "security": false
  },
  "v13": {
      "version": "v13.14.0",
      "date": "2020-04-28",
      "files": [],
      "npm": "6.14.4",
      "v8": "7.9.317.25",
      "uv": "1.37.0",
      "zlib": "1.2.11",
      "openssl": "1.1.1g",
      "modules": "79",
      "lts": false,
      "security": false
  }
}
```

### Tests

Each of the above endpoints should have its own tests. Use the provided `test/index.js` file to get started and see below for example output.

#### Test Requirements

- Write tests using `tape`
- Mock http requests during tests by using `nock` to prevent live requests

```bash
# should get dependencies
  ok 1 should contain bent
  ok 2 should contain express
  ok 3 should contain hbs
  ok 4 should contain semver

# should get minimum secure versions
  ok 5 v14 version should match
  ok 6 v13 version should match

# should get latest-releases
  ok 7 v14 version should match
  ok 8 v13 version should match
```

## Dependencies

| Name                                             | Description                                                       |
| ------------------------------------------------ | ----------------------------------------------------------------- |
| [bent](https://www.npmjs.com/package/bent)       | Functional HTTP client for Node.js and Browsers with async/await. |
| [express](https://www.npmjs.com/package/express) | Fast, unopinionated, minimalist web framework for node.           |
| [hbs](https://www.npmjs.com/package/hbs)         | Express.js view engine for handlebars.js                          |
| [semver](https://www.npmjs.com/package/semver)   | The semantic versioner for npm                                    |

### Development dependencies

| Name                                               | Description                                              |
| -------------------------------------------------- | -------------------------------------------------------- |
| [get-port](https://www.npmjs.com/package/get-port) | Get an available TCP port                                |
| [nock](https://www.npmjs.com/package/nock)         | HTTP server mocking and expectations library for Node.js |
| [tape](https://www.npmjs.com/package/tape)         | tap-producing test harness for node and browsers         |
