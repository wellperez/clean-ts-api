import { SurveyResultModel } from '@/domain/models/survey-result'

export const mockSaveSurveyResultParams = (): SurveyResultModel => ({
  id: 'any_id',
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: new Date()
})

export const mockSurveyResultModel = (): SurveyResultModel =>
  Object.assign({}, mockSaveSurveyResultParams(), {
    accountId: 'any_account_id'
  })
