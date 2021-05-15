import { LoadSurveys } from './LoadSurveysControllerProtocols'
import { LoadSurveysController } from './LoadSurveysController'
import { noContent, ok, serverError } from '../../../helpers/http/HttpHelper'
import { mockSurveysModelArray, throwError } from '@domain/test'
import { LoadSurveysSpy } from '@shared/test'
import MockDate from 'mockdate'

type SutTypes = {
  sut: LoadSurveysController;
  loadSurveysSpy: LoadSurveys;
}

const makeSut = (): SutTypes => {
  const loadSurveysSpy = new LoadSurveysSpy()
  const sut = new LoadSurveysController(loadSurveysSpy)

  return {
    sut,
    loadSurveysSpy
  }
}

describe('LoadSurveys Controller', () => {
  beforeAll(() => MockDate.set(new Date()))
  afterAll(() => MockDate.reset())

  test('should call LoadSurveys', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysSpy, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(mockSurveysModelArray()))
  })

  test('should return 204 if LoadSurveys returns empty', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    jest.spyOn(loadSurveysSpy, 'load').mockReturnValueOnce(Promise.resolve([]))

    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(noContent())
  })

  test('should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    jest.spyOn(loadSurveysSpy, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
