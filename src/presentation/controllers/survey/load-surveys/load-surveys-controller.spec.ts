import { LoadSurveysController } from './load-surveys-controller'
import { LoadSurveys } from './load-surveys-controller-protocols'
import {
  noContent,
  ok,
  serverError
} from '@/presentation/helpers/http/http-helper'
import { mockSurveysModel, throwError } from '@/domain/test'
import MockDate from 'mockdate'
import { mockLoadSurveys } from '@/presentation/test'

type SutTypes = {
  sut: LoadSurveysController;
  loadSurveysStub: LoadSurveys;
}

const makeSut = (): SutTypes => {
  const loadSurveysStub = mockLoadSurveys()
  const sut = new LoadSurveysController(loadSurveysStub)
  return {
    sut,
    loadSurveysStub
  }
}

describe('LoadSurveys', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call LoadSurveys', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')
    await sut.handle()
    expect(loadSpy).toHaveBeenCalled()
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(ok(mockSurveysModel()))
  })

  test('should return 204 on success', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest
      .spyOn(loadSurveysStub, 'load')
      .mockReturnValueOnce(new Promise((resolve) => resolve([])))
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(noContent())
  })

  test('should return 500 if AddSurvey throws', async () => {
    const { loadSurveysStub, sut } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
