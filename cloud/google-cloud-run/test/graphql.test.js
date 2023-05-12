'use strict'

import test from 'node:test'
import assert from 'node:assert/strict'
import build from './../app.js'

test('/gaphql', async (t) => {
  const app = build({ logger: false })
  const expected = { data: { add: 2 } }
  const query = `{
    add(x:1,y:1) 
  }`

  const response = await app.inject({
    method: 'POST',
    url: '/graphql',
    body: { query: query }
  })
  const actual = await response.json()

  assert.equal(response.statusCode, 200, 'returns a status code of 200')
  assert.deepEqual(actual, expected)
  await app.close
})
