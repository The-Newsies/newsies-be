const { getArticles, prepare } = require('../test/data-helpers');
const User = require('../lib/models/User');

const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/middleware/ensure-auth.js');

describe('collection routes', () => {
  it('creates a collection', async() => {
    const user = prepare(await User.create({ 
      name: 'User',
      avatar: 'urlhere', 
      authid: 'fake-user|12345' 
    }));

    console.log(user._id);
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
});
