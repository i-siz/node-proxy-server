import meteorRouter from '../../routes/meteor-routes';
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
app.use(meteorRouter);

describe('meteor router', () => {
  it('meteor api router works', (done) => {
    request(app)
      .get('/api/meteors')
      .expect('Content-Type', /json/)
      .expect((res) => {
        expect(res.body.data).toBeDefined();
        expect(res.body.data.count).toBeDefined();
        expect(res.body.data.meteors).toBeDefined();
      })
      .expect(200, done);
  });
  it('meteor web router works', (done) => {
    request(app)
      .get('/meteors')
      .expect('Content-Type', /html/)
      .expect((res) => {
        expect(res.text).toContain('Asteroids');
      })
      .expect(200, done);
  });
});
