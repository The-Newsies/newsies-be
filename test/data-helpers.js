require('dotenv').config();

const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const seedData = require('./seed-data');

const prepare = arr => JSON.parse(JSON.stringify(arr));

beforeAll(() => {
  connect();
});

beforeEach(() => {
  return mongoose.connection.dropDatabase();
});

let seededUsers = null;

beforeEach(async() => {
  const { users } = await seedData();
  seededUsers = prepare(users);
  return seededUsers;
});

afterAll(() => {
  return mongoose.connection.close();
});

module.exports = {
  getUsers: () => seededUsers,
};
