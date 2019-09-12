const { prepare } = require('./data-helpers');
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
});
