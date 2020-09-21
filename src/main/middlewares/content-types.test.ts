import request from 'supertest'
import app from '../config/app'

describe('Content Type Middleware', () => {
  const uri = '/test_content_type'
  test('should return default content type as json', async () => {
    app.get(uri, (req, res) => {
      res.send('')
    })
    await request(app)
      .get(uri)
      .expect('content-type', /json/)
  })
  test('should return xml content when forced', async () => {
    const uri = '/test_content_type_xml'
    app.get(uri, (req, res) => {
      res.type('xml')
      res.send('')
    })
    await request(app)
      .get(uri)
      .expect('content-type', /xml/)
  })
})
