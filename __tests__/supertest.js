
const supertest = require('supertest');
const server = 'http://localhost:3000';

const request = supertest(server);

xdescribe('Route integration', () => {
  describe('/graphql', () => {
    it('gets a list of users', () => {
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