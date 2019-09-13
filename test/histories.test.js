const { getTags, getArticles } = require('./data-helpers');
// const History = require('../lib/models/History');

const request = require('supertest');
const app = require('../lib/app');

describe('history routes', () => {
  it('posts history collection', async() => {
    const tags = await getTags();
    const articles = await getArticles();
    const articleIds = articles.map(article => article._id);

    return request(app)
      .post('/api/v1/histories')
      .send({ articleIds, tag: tags[0] })
      .then(res => {
        expect(res.body).toEqual({ 
          _id: expect.any(String),
          articleIds: articleIds,
          tag: tags[0]._id,
          createdAt: expect.any(String),
          updatedAt: expect.any(String)
        });
      });
  });
});

