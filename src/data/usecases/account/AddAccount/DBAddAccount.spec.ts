import { Hasher, AddAccountRepository, LoadAccountByEmailRepository } from './DBAddAccountProtocols'
import { mockAccountModel, mockAddAccountParams, throwError } from '@domain/test'
import { AddAccountRepositorySpy, HasherSpy, LoadAccountByEmailRepositorySpy } from '@data/test'
import { DBAddAccount } from './DBAddAccount'

type SutTypes = {
  sut: DBAddAccount;
  hasherSpy: HasherSpy;
  addAccountRepositorySpy: AddAccountRepositorySpy;
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy;
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  loadAccountByEmailRepositorySpy.result = null
  const hasherSpy = new HasherSpy()
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const sut = new DBAddAccount(hasherSpy, addAccountRepositorySpy, loadAccountByEmailRepositorySpy)

  return {
    sut,
    hasherSpy,
    addAccountRepositorySpy,
    loadAccountByEmailRepositorySpy
  }
}

describe('DBAddAccount Usecase', () => {
  test('should call Hasher with correct password', async () => {
    const { sut, hasherSpy } = makeSut()
    const addAccountParams = mockAddAccountParams()
    await sut.create(addAccountParams)
    expect(hasherSpy.payload).toBe(addAccountParams.password)
  })

  test('should throw if Hasher throws', async () => {
    const { sut, hasherSpy } = makeSut()
    jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError)
    const promise = sut.create(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositorySpy, hasherSpy } = makeSut()
    const addAccountParams = mockAddAccountParams()
    await sut.create(addAccountParams)
    expect(addAccountRepositorySpy.params).toEqual({
      name: addAccountParams.name,
      email: addAccountParams.email,
      password: hasherSpy.result
    })
  })

  test('should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositorySpy } = makeSut()
    jest.spyOn(addAccountRepositorySpy, 'create').mockImplementationOnce(throwError)
    const promise = sut.create(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('should return an account on success', async () => {
    const { sut, addAccountRepositorySpy, loadAccountByEmailRepositorySpy } = makeSut()
    const addAccountParams = mockAddAccountParams()
    const account = await sut.create(addAccountParams)
    expect(account).toEqual(addAccountRepositorySpy.result)
  })

  test('should return null if LoadAccountByEmailRepository not returns null', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail').mockReturnValueOnce(Promise.resolve(mockAccountModel()))
    const account = await sut.create(mockAddAccountParams())
    expect(account).toBeNull()
  })

  test('should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    const addAccountParams = mockAddAccountParams()
    await sut.create(addAccountParams)
    expect(loadAccountByEmailRepositorySpy.email).toEqual(addAccountParams.email)
  })
})
