import assert from 'node:assert/strict'
import test from 'node:test'
import server from '../index.js'

test('http', async (t) => {
  await t.test('/', async () => {
    try {
      // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
      const request = await fetch('http://localhost:3000')
      const actual = await request.json()
      const expected = { data: 'Hello World!' }

      assert.deepEqual(actual, expected)
    } catch (error) {
      assert.fail(error)
    }
  })

  await t.test('/api', async () => {
    try {
      const request = await fetch('http://localhost:3000/api')
      const actual = await request.json()
      const expected = { data: 'Awesome API!' }

      assert.deepEqual(actual, expected)
    } catch (error) {
      assert.fail(error)
    }
  })

  t.after(() => server.close())
})
