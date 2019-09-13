const { getTags } = require('./data-helpers');
const Tag = require('../lib/models/Tag');

const request = require('supertest');
const app = require('../lib/app');

describe('tag routes', () => {
  it('posts a tag', () => {
    return request(app)
      .post('/api/v1/tags')
      .send({ name: 'entertainment ', hexCode: '#111111' })
      .then(res => {
        expect(res.body).toEqual({ 
          _id: expect.any(String),
          name: 'entertainment ', 
          hexCode: '#111111' 
        });
      });
  });

  it('gets all tags', () => {
    getTags();
    return request(app)
      .get('/api/v1/tags')
      .then(res => {
        expect(res.body).toEqual(
          expect.arrayContaining([
            expect.objectContaining({ 
              name: expect.any(String),
              hexCode: expect.any(String)
            })
          ]));
      });
  });

  it('gets tag by id', async() => {
    const tag = await Tag.create({ 
      name: 'entertainment ', 
      hexCode: '#111111'  
    });
    return request(app)
      .get(`/api/v1/tags/${tag._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: tag.name,
          hexCode: tag.hexCode
        });
      });
  });
  it('deletes a tag', async() => {
    const tag = await Tag.create({ 
      name: 'entertainment ', 
      hexCode: '#111111'  
    });
    return request(app)
      .delete(`/api/v1/tags/${tag._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: tag.name,
          hexCode: tag.hexCode
        });
      });
  });
});
