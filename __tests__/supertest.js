
const supertest = require('supertest');
const server = 'http://localhost:3000';

const request = supertest(server);

describe('Route integration', () => {
  describe('/graphql', () => {
    it('gets a list of users', (done) => {
      return request
        .post('/graphql')
        .send({
          query: "{ users{ id, name} }",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", "/json/")
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).toBeInstanceOf(Object);
        })
    })
  })
})