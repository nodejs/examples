# API with Express & Handlebar Templates

> Use Express.js to create three (3) routes that consume the [API](https://nodejs.org/dist/index.json)

## Installation Instructions

### To run the application

```bash
npm run start
```

### To run the tests

```bash
npm run test
```

## Goals

1. Fetch data from an API and serve JSON content as response
2. Render out data using dynamic template files
3. Identify and write useful tests

### Routes

1. `GET - /dependencies`

   This will retrieve all dependencies from the `package.json` and render HTML using handlebars.

   #### Example Response

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

2. `GET - /minimum-secure`

   This will return the minimum secure version for each release line as JSON. In other words, what is the highest version of each line that has `security: true`.

   #### Example Response

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
      },

   ```

3. `GET - /latest-releases`

   This will return the latest release version in each release line as JSON.

   #### Example Response

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
     },

   ```

### Tests

Each of the above endpoints should have its own tests. Use the provided `test/index.js` file to get started and see below for example output.

#### Test Requirements:

- Write tests using `tape`
- Mock http requests during tests by using `nock` to prevent live requests

```bash
# should get dependencies
  ok 1 should contain bent
  ok 2 should contain express
  ok 3 should contain hbs

# should get minimum secure versions
  ok 4 v0 version should match
  ok 5 v4 version should match

# should get latest-releases
  ok 6 v14 version should match
  ok 7 v13 version should match
```

## Dependencies

| Name                                             | Version   | Description                                                       |
| ------------------------------------------------ | --------- | ----------------------------------------------------------------- |
| [bent](https://www.npmjs.com/package/bent)       | `^7.3.10` | Functional HTTP client for Node.js and Browsers with async/await. |
| [express](https://www.npmjs.com/package/express) | `^4.17.1` | Fast, unopinionated, minimalist web framework for node.           |
| [hbs](https://www.npmjs.com/package/hbs)         | `^4.1.1`  | Express.js view engine for handlebars.js                          |
| [semver](https://www.npmjs.com/package/semver)   | `^7.3.2`  | The semantic versioner for npm                                    |

### Development dependencies

| Name                                               | Version   | Description                                              |
| -------------------------------------------------- | --------- | -------------------------------------------------------- |
| [get-port](https://www.npmjs.com/package/get-port) | `^5.1.1`  | Get an available TCP port                                |
| [nock](https://www.npmjs.com/package/nock)         | `^13.0.4` | HTTP server mocking and expectations library for Node.js |
| [tape](https://www.npmjs.com/package/tape)         | `^5.0.1`  | tap-producing test harness for node and browsers         |
