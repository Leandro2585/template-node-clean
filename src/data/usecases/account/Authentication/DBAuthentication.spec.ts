import { mockAuthenticationParams, throwError } from '@domain/test'
import { DBAuthentication } from './DBAuthentication'
import { EncrypterSpy, HashComparerSpy, LoadAccountByEmailRepositorySpy, UpdateAccessTokenRepositorySpy } from '@data/test'

type SutTypes = {
  sut: DBAuthentication;
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy;
  encrypterSpy: EncrypterSpy;
  hashComparerSpy: HashComparerSpy;
  updateAccessTokenRepositorySpy: UpdateAccessTokenRepositorySpy;
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const updateAccessTokenRepositorySpy = new UpdateAccessTokenRepositorySpy()
  const hashComparerSpy = new HashComparerSpy()
  const encrypterSpy = new EncrypterSpy()
  const sut = new DBAuthentication(
    loadAccountByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
    updateAccessTokenRepositorySpy
  )

  return {
    sut,
    loadAccountByEmailRepositorySpy,
    encrypterSpy,
    hashComparerSpy,
    updateAccessTokenRepositorySpy
  }
}

describe('DBAuthentication Usecase', () => {
  test('should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    await sut.auth(authenticationParams)
    expect(loadAccountByEmailRepositorySpy.email).toBe(authenticationParams.email)
  })

  test('should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })

  test('should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    loadAccountByEmailRepositorySpy.result = null
    const authenticationResult = await sut.auth(mockAuthenticationParams())
    expect(authenticationResult).toBeNull()
  })

  test('should call HashComparer with correct values', async () => {
    const { sut, hashComparerSpy, loadAccountByEmailRepositorySpy } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    await sut.auth(authenticationParams)
    expect(hashComparerSpy.payload).toBe(authenticationParams.password)
    expect(hashComparerSpy.hashed).toBe(loadAccountByEmailRepositorySpy.result.password)
  })

  test('should throw if HashComparer throws', async () => {
    const { sut, hashComparerSpy } = makeSut()
    jest.spyOn(hashComparerSpy, 'compare').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })

  test('should return null if HashComparer returns false', async () => {
    const { sut, hashComparerSpy } = makeSut()
    jest.spyOn(hashComparerSpy, 'compare').mockReturnValueOnce(Promise.resolve(false))
    const accessToken = await sut.auth(mockAuthenticationParams())
    expect(accessToken).toBeNull()
  })

  test('should call Encrypter with correct id', async () => {
    const { sut, encrypterSpy, loadAccountByEmailRepositorySpy } = makeSut()
    const authenticationParams = mockAuthenticationParams()
    await sut.auth(authenticationParams)
    expect(encrypterSpy.payload).toBe(loadAccountByEmailRepositorySpy.result.id)
  })

  test('should throw if Encrypter throws', async () => {
    const { sut, encrypterSpy } = makeSut()
    jest.spyOn(encrypterSpy, 'encrypt').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })

  test('should return a token and name on success', async () => {
    const { sut, loadAccountByEmailRepositorySpy, encrypterSpy } = makeSut()
    const authentication = await sut.auth(mockAuthenticationParams())
    expect(authentication.accessToken).toBe(encrypterSpy.hashed)
    expect(authentication.name).toBe(loadAccountByEmailRepositorySpy.result.name)
  })

  test('should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositorySpy, loadAccountByEmailRepositorySpy, encrypterSpy } = makeSut()
    await sut.auth(mockAuthenticationParams())
    expect(updateAccessTokenRepositorySpy.id).toBe(loadAccountByEmailRepositorySpy.result.id)
    expect(updateAccessTokenRepositorySpy.token).toBe(encrypterSpy.hashed)
  })

  test('should throw if UpdateAccessTokenRepository throws', async () => {
    const { sut, updateAccessTokenRepositorySpy } = makeSut()
    jest.spyOn(updateAccessTokenRepositorySpy, 'updateAccessToken').mockImplementationOnce(throwError)
    const promise = sut.auth(mockAuthenticationParams())
    await expect(promise).rejects.toThrow()
  })
})
