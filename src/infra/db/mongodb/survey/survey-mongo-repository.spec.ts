import { Collection } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { SurveyMongoRepository } from './survey-mongo-repository'
import MockDate from 'mockdate'

let surveyCollection: Collection

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    MockDate.set(new Date())
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
    MockDate.reset()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  const makeSut = (): SurveyMongoRepository => {
    return new SurveyMongoRepository()
  }

  describe('add()', () => {
    test('should load all surveys on success', async () => {
      const sut = makeSut()
      await sut.add({
        question: 'any_question',
        answers: [{
          image: 'any_image',
          answer: 'any_answer'
        }, {
          answer: 'other_answer'
        }],
        date: new Date()
      })
      const survey = await surveyCollection.findOne({ question: 'any_question' })
      expect(survey).toBeTruthy()
    })
  })

  describe('loadAll()', () => {
    test('should load surveys on success', async () => {
      const sut = makeSut()
      await surveyCollection.insertMany([
        {
          question: 'any_question',
          answers: [{
            image: 'any_image',
            answer: 'any_answer'
          }, {
            answer: 'other_answer'
          }],
          date: new Date()
        },
        {
          question: 'another_question',
          answers: [{
            image: 'another_image',
            answer: 'another_answer'
          }, {
            answer: 'another_answer'
          }],
          date: new Date()
        }
      ])
      const survey = await sut.loadAll()
      expect(survey.length).toBe(2)
      expect(survey[0].question).toBe('any_question')
      expect(survey[1].question).toBe('another_question')
    })
  })
  test('should load surveys on success', async () => {
    const sut = makeSut()
    const survey = await sut.loadAll()
    expect(survey.length).toBe(0)
  })
})
