
const supertest = require('supertest');
const server = 'http://localhost:8080';

const request = supertest(server);

describe('Route integration', () => {
  describe('/graphql', () => {
    it('gets a list of users', (done) => {
      request
        .post('/graphql')
        .send({
          query: "{ users{ id, name} }",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(200)
        .end((err, res) => {
          if (err) done(err);
          expect(res.body).toBeInstanceOf(Object);
        })
    })
  })
})