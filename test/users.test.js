const { getUsers, getTags } = require('./data-helpers');
const User = require('../lib/models/User');

const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/middleware/ensure-auth.js');

describe('user routes', () => {
  it('creates a user', () => {
    return request(app)
      .post('/api/v1/users')
      .send({
        name: 'User',
        avatar: 'urlhere'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'User',
          avatar: 'urlhere',
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          authid: 'fake-user|12345',
          tags: []
        });
      });
  });

  it('can get users', () => {
    getUsers();
    return request(app)
      .get('/api/v1/users')
      .then(res => {
        expect(res.body).toEqual(expect.any(Array));
      });
  });

  it('can get logged in user', async() => {
    await User.create({ 
      name: 'User',
      avatar: 'urlhere', 
      authid: 'fake-user|12345' 
    });

    return request(app)
      .get('/api/v1/users/logged-in-user')
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'User',
          avatar: 'urlhere',
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          authid: 'fake-user|12345',
          tags: []
        });
      });
  });

  it('can add a tag to tag array', async() => {
    await User.create({ 
      name: 'User',
      avatar: 'urlhere', 
      authid: 'fake-user|12345' 
    });

    const tag = getTags()[0];

    return request(app)
      .patch('/api/v1/users/add-tag')
      .send({ tag: tag._id })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'User',
          avatar: 'urlhere',
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          authid: 'fake-user|12345',
          tags: [tag._id]
        });
      });
  });

  it('can delete a tag from tag array', async() => {
    const tag = getTags()[0];

    await User.create({ 
      name: 'User',
      avatar: 'urlhere', 
      authid: 'fake-user|12345',
      tags: [tag._id]
    });

    return request(app)
      .patch('/api/v1/users/delete-tag')
      .send({ tag: tag._id })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'User',
          avatar: 'urlhere',
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          authid: 'fake-user|12345',
          tags: []
        });
      });
  });
});
