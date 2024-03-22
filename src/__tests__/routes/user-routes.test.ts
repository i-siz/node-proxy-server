import userRouter from '../../routes/user-routes';
import express from 'express';
import request from 'supertest';
import nunjucks from 'nunjucks';
import path from 'path';

const app = express();

nunjucks.configure(path.resolve(__dirname, '../../views'), {
  autoescape: true,
  express: app,
});

app.use(express.urlencoded({ extended: false }));
app.use(userRouter);

describe('user router', () => {
  it('post user api router works', (done) => {
    request(app)
      .post('/api/user')
      .type('form')
      .send({ user_id: 42, user_name: 'John Galt', api_key: '0123456789012345678901234567890123456789' })
      .expect('Content-Type', /html/)
      .expect((res) => {
        expect(res.text).toContain('img');
      })
      .expect(200, done);
  });
  it('post user web router works', (done) => {
    request(app)
      .post('/user')
      .type('form')
      .send({ user_id: 42, user_name: 'John Galt', api_key: '0123456789012345678901234567890123456789' })
      .expect('Content-Type', /html/)
      .expect((res) => {
        expect(res.text).toContain('Rover photo');
      })
      .expect(200, done);
  });
  it('user form web router works', (done) => {
    request(app)
      .get('/user-form')
      .expect('Content-Type', /html/)
      .expect((res) => {
        expect(res.text).toContain('user-form');
      })
      .expect(200, done);
  });
});
