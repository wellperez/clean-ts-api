
import MockDate from 'mockdate'
import { DbLoadSurveys } from './db-load-surveys'
import { LoadSurveysRepository } from './db-load-surveys-protocols'
import { mockSurveysModel, throwError } from '@/domain/test'
import { mockLoadSurveysRepository } from '@/data/test'

const makeSut = (): SutTypes => {
  const loadSurveysRepository = mockLoadSurveysRepository()
  const sut = new DbLoadSurveys(loadSurveysRepository)

  return {
    sut,
    loadSurveysRepository
  }
}

type SutTypes = {
  sut: DbLoadSurveys;
  loadSurveysRepository: LoadSurveysRepository;
}

describe('DbLoadSurveys', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })
  test('should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepository } = makeSut()
    const loadAllSpy = jest.spyOn(loadSurveysRepository, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalled()
  })

  test('should return a list of Surveys on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.load()
    expect(surveys).toEqual(mockSurveysModel())
  })

  test('Should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepository } = makeSut()
    jest.spyOn(loadSurveysRepository, 'loadAll').mockImplementationOnce(throwError)
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
