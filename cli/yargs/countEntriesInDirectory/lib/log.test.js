const log = require('./log')

describe('test `log()` successful runs', () => {
  test('expect `log()` to log an async method that itself does not return a promise', async () => {
    console.log = jest.fn()

    await log(awaitedMethodWithoutAPromise(6))

    expect(console.log).toHaveBeenCalledWith(6)
  })

  test('expect `log()` to log an async method that itself returns a promise', async () => {
    console.log = jest.fn()

    await log(awaitedMethodWithAPromise(22))

    expect(console.log).toHaveBeenCalledWith(44)
  })
})

async function awaitedMethodWithoutAPromise (anyValue) {
  return anyValue
}

async function awaitedMethodWithAPromise (anyValue) {
  const valueToReturn = await awaitedMethodWithoutAPromise(anyValue) * 2

  return valueToReturn
}
