import request from 'supertest'
import app from '@/main/config/app'

describe('Body Parser Middleware', () => {
  const uri = '/test_body_parser'
  test('should parse body as json', async () => {
    app.post(uri, (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post(uri)
      .send({ name: 'Wellington' })
      .expect({ name: 'Wellington' })
  })
})
