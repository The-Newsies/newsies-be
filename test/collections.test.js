const { getArticles, getCollections, getLoggedInUser } = require('../test/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/middleware/ensure-auth.js');

describe('collection routes', () => {
  it('creates a collection', async() => {
    const user = await getLoggedInUser();
    const articles = await getArticles();

    return request(app)
      .post('/api/v1/collections')
      .send({
        name: 'My First Collection',
        articleIds: [articles[0]._id, articles[4]._id],
        description: 'love this description'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'My First Collection',
          articleIds: [articles[0]._id, articles[4]._id],
          user: user._id,
          description: 'love this description'
        });
      });
  });

  it('gets all collections by logged in user', async() => {
    const user = await getLoggedInUser();
    const collections = await getCollections();
    const expectedCollections = collections.filter(collection => {
      return collection.user === user._id;
    });

    return request(app)
      .get('/api/v1/collections')
      .then(res => {
        expect(res.body).toHaveLength(5);
        expectedCollections.forEach(collection => {
          expect(res.body).toContainEqual(collection);
        });
      });
  });

  it('gets a collection by id', async() => {
    const collection = await getCollections()[0];

    return request(app)
      .get(`/api/v1/collections/${collection._id}`)
      .then(res => {
        expect(res.body).toEqual(collection);
      });
  });

});
