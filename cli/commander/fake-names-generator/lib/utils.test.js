
const utils = require('./utils')

describe('utils tests', () => {
  test('should call log.dim', () => {
    jest.spyOn(utils.log, 'dim')
    utils.log.dim()
    expect(utils.log.dim).toHaveBeenCalled()
  })

  test('should return a name with current timestamp', () => {
    jest.spyOn(utils, 'getFileName')
    const currentTime = new Date().toLocaleTimeString([], { hour12: false }).split(':').join('-')
    utils.getFileName()
    expect(utils.getFileName).toHaveBeenCalled()
    expect(utils.getFileName()).toBe(`fake-names-${currentTime}.json`)
  })
})
