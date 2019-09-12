const { getUsers } = require('./data-helpers');

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

  // it('can get user by id', () => {
  //   return request(app)
  //     .
  // })
});
