const fakeNames = require('./fake-names')
const utils = require('../lib/utils')
const fs = require('fs')

describe('fake names tests', () => {
  test('should generate a first name', () => {
    const spy = jest.spyOn(fakeNames, 'firstName').mockImplementation(() => 'Jane')
    fakeNames.firstName()
    expect(spy).toHaveBeenCalled()
    expect(spy()).toBe('Jane')
  })

  test('should generate a last name', () => {
    const spy = jest.spyOn(fakeNames, 'lastName').mockImplementation(() => 'Doe')
    fakeNames.lastName()
    expect(spy).toHaveBeenCalled()
    expect(spy()).toBe('Doe')
  })

  test('should generate a full name', () => {
    const spy = jest.spyOn(fakeNames, 'fullName').mockImplementation(() => 'Jane Doe')

    fakeNames.fullName()
    expect(spy).toHaveBeenCalled()
    expect(spy()).toBe('Jane Doe')
  })

  test('should generate names only 1 time by default', () => {
    const names = fakeNames.generateNames()
    expect(names).toHaveLength(1)
  })

  test('should generate names n times', () => {
    const names = fakeNames.generateNames(5)
    expect(names).toHaveLength(5)
  })

  test('should log names', () => {
    jest.spyOn(fakeNames, 'logNames')
    jest.spyOn(fakeNames, 'generateNames')
    jest.spyOn(console, 'log')
    fakeNames.logNames()
    expect(fakeNames.logNames).toHaveBeenCalled()
    expect(fakeNames.generateNames).toHaveBeenCalled()
    expect(console.log).toHaveBeenCalled()
  })

  test('should save names in a file', () => {
    jest.spyOn(fakeNames, 'saveNames')
    jest.spyOn(fakeNames, 'generateNames')
    jest.spyOn(fs, 'writeFileSync')
    jest.spyOn(utils.log, 'success')
    jest.spyOn(utils, 'getFileName')

    fakeNames.saveNames(5)
    expect(fakeNames.saveNames).toHaveBeenCalled()
    expect(fakeNames.generateNames).toHaveBeenCalled()
    expect(fs.writeFileSync).toHaveBeenCalled()
    expect(utils.log.success).toHaveBeenCalled()

    // Cleanup by Deleting the generated file
    fs.readdirSync('./')
      .filter(f => f.startsWith('fake-names-') && f.endsWith('.json'))
      .map(f => fs.unlinkSync(f))
  })
})
