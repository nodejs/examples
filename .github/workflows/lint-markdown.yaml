name: cli-yargs-countentriesindirectory

on: [push, pull_request]

jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest]
        node-version: [14.x]
    env:
      CI: true
    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js ${{ matrix.node-version }} on ${{ matrix.os }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}
    - name: npm install
      run: npm install
    - name: npm run test:markdown
      run: npm run test:markdown
