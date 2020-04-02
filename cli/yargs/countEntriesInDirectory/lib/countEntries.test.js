const countEntries = require('./countEntries')

describe('test `countFiles()` successful runs', () => {
  test('Test entries in cli/yargs/countEntriesInDirectory', async () => {
    const directory = __dirname // this will be `lib`
    const entries = await countEntries(directory)

    expect(entries).toBe(4)
  })
})
