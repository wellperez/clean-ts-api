import request from 'supertest'
import app from '@/main/config/app'

describe('CORS Middleware', () => {
  const uri = '/test_cors'
  test('should enable CORS', async () => {
    app.get(uri, (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .get(uri)
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
