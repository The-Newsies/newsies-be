require('dotenv').config();

const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const seedData = require('./seed-data');
mongoose.set('useUnifiedTopology', true);

const prepare = arr => JSON.parse(JSON.stringify(arr));

beforeAll(() => {
  connect();
});

beforeEach(() => {
  return mongoose.connection.dropDatabase();
});

let seededUsers = null;
let seededTags = null;
let seededArticles = null;
let seededTrendingHistories = null;
let seededCollections = null;
let seededLoggedInUser = null;

beforeEach(async() => {
  const { users, tags, articles, trendingHistories, collections, loggedInUser } = await seedData();
  seededUsers = prepare(users);
  seededTags = prepare(tags);
  seededArticles = prepare(articles);
  seededTrendingHistories = prepare(trendingHistories);
  seededCollections = prepare(collections);
  seededLoggedInUser = prepare(loggedInUser);
});

afterAll(() => {
  return mongoose.connection.close();
});

module.exports = {
  prepare,
  getUsers: () => seededUsers,
  getTags: () => seededTags,
  getArticles: () => seededArticles,
  getTrendingHistories: () => seededTrendingHistories,
  getCollections: () => seededCollections,
  getLoggedInUser: () => seededLoggedInUser
};
