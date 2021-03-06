const { prepare, getTrendingHistories, getCollections } = require('./data-helpers');
const Article = require('../lib/models/Article');

const request = require('supertest');
const app = require('../lib/app');

describe('article routes', () => {
  it('post an article', () => {
    return request(app)
      .post('/api/v1/articles')
      .send({ 
        source: { id: 'id', name: 'name' },
        author: 'author',
        title: 'title',
        description: 'description',
        url: 'url',
        urlToImage: 'url.url',
        publishedAt: 'date',
        content: 'hi'
      })
      .then(res => {
        expect(res.body).toEqual({ 
          _id: expect.any(String),
          source: { id: 'id', name: 'name' },
          author: 'author',
          title: 'title',
          description: 'description',
          url: 'url',
          urlToImage: 'url.url',
          publishedAt: 'date',
          content: 'hi' 
        });
      });
  });

  it('gets article by id', async() => {
    const article = prepare(await Article.create({ 
      source: { id: 'id', name: 'name' },
      author: 'author',
      title: 'title',
      description: 'description',
      url: 'url',
      urlToImage: 'url.url',
      publishedAt: 'date',
      content: 'hi'
    }));

    return request(app)
      .get(`/api/v1/articles/${article._id}`)
      .then(res => {
        expect(res.body).toEqual({ 
          ...article, 
          _id: expect.any(String)
        });
      });
  });

  it('can get articles from history', async() => {
    const history = await getTrendingHistories()[0];

    return request(app)
      .get(`/api/v1/articles/by-history/${history._id}`)
      .then(res => {
        expect(res.body).toEqual(expect.any(Array));
      });
  });

  it('can get articles from collection', async() => {
    const collection = await getCollections()[0];

    return request(app)
      .get(`/api/v1/articles/by-collection/${collection._id}`)
      .then(res => {
        expect(res.body).toEqual(expect.any(Array));
      });
  });
});
