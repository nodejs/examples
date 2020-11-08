const fakeNames = require('./fake-names')
const faker = require('faker')
const fs = require('fs')
const utils = require('../lib/utils')

describe('fake names tests', () => {
  const fakerFirstNameSpy = jest.spyOn(faker.name, 'firstName').mockImplementation(() => 'Jane')
  const fakerLastNameSpy = jest.spyOn(faker.name, 'lastName').mockImplementation(() => 'Doe')
  const genderSpy = jest.spyOn(fakeNames, 'randomGender').mockImplementation(() => 'female')

  test('should generate a first name', () => {
    const spy = jest.spyOn(fakeNames, 'firstName')
    fakeNames.firstName()

    expect(genderSpy).toHaveBeenCalled()
    expect(spy).toHaveBeenCalled()
    expect(fakerFirstNameSpy).toHaveBeenCalled()
    expect(spy()).toBe('Jane')
  })

  test('should generate a male first name', () => {
    const spy = jest.spyOn(fakeNames, 'firstName')

    fakeNames.firstName('male')
    expect(spy).toHaveBeenCalledWith('male')
    expect(fakerFirstNameSpy).toHaveBeenCalledWith('male')
    expect(spy()).toBe('Jane')
  })

  test('should generate a last name', () => {
    const spy = jest.spyOn(fakeNames, 'lastName')
    fakeNames.lastName()

    expect(spy).toHaveBeenCalled()
    expect(fakerLastNameSpy).toHaveBeenCalled()
    expect(spy()).toBe('Doe')
  })

  test('should generate a male last name', () => {
    const spy = jest.spyOn(fakeNames, 'lastName')

    fakeNames.lastName('male')
    expect(spy).toHaveBeenCalledWith('male')
    expect(fakerLastNameSpy).toHaveBeenCalledWith('male')
    expect(spy()).toBe('Doe')
  })

  test('should generate a full name', () => {
    const firstNameSpy = jest.spyOn(fakeNames, 'firstName')
    const lastNameSpy = jest.spyOn(fakeNames, 'lastName')
    const spy = jest.spyOn(fakeNames, 'fullName')

    fakeNames.fullName()
    expect(spy).toHaveBeenCalled()
    expect(firstNameSpy).toHaveBeenCalled()
    expect(lastNameSpy).toHaveBeenCalled()
    expect(fakerFirstNameSpy).toHaveBeenCalled()
    expect(fakerLastNameSpy).toHaveBeenCalled()
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
  })

  test('should generate a random gender', () => {
    fakeNames.randomGender()
    expect(genderSpy).toHaveBeenCalled()
    expect(genderSpy()).toBe('female')
  })
})
