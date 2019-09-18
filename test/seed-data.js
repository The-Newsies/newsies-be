const User = require('../lib/models/User');
const Tag = require('../lib/models/Tag');
const Article = require('../lib/models/Article');
const History = require('../lib/models/History');
const Collection = require('../lib/models/Collection');

const chance = require('chance').Chance();

module.exports = async({ users = 5, tags = 5, articles = 10, histories = 5, collections = 5 } = {}) => {
  const createdUsers = await User.create(
    [...Array(users)].map(() => ({
      name: chance.name(),
      avatar: chance.url({ extensions: ['jpg'] }),
      authid: chance.string()
    }))
  );

  const createdTags = await Tag.create(
    [...Array(tags)].map(() => ({
      name: chance.name(),
      hexCode: chance.string()
    }))
  );

  const trendingTag = await Tag.create({
    name: 'trending',
    hexCode: chance.string()
  });

  createdTags.push(trendingTag);

  const createdArticles = await Article.create(
    [...Array(articles)].map(() => ({
      source: { id: chance.name(), name: chance.name() },
      author: chance.name(),
      title: chance.string(),
      description: chance.string(),
      url: chance.url(),
      urlToImage: chance.url({ extensions: ['jpg'] }),
      publishedAt: chance.string(),
      content: chance.string()
    }))
  );

  const articleIds = createdArticles.map(article => article._id);

  const createdTrendingHistories = await Promise.all([...Array(histories)].map(async() => {
    return await History.create({
      articleIds,
      tag: createdTags[createdTags.length - 1]._id
    });
  }));

  const createdLoggedInUser = await User.create({ 
    name: 'User',
    avatar: 'urlhere', 
    authid: 'fake-user|12345' 
  });

  const createdCollectionsByLoggedInUser = await Collection.create(
    [...Array(collections)].map(() => ({
      name: chance.name(),
      articleIds: [createdArticles[0]._id],
      user: createdLoggedInUser._id,
      description: chance.sentence()
    }))
  );

  const createdCollectionsByOther = await Collection.create(
    [...Array(collections)].map(() => ({
      name: chance.name(),
      articleIds: chance.pickset(articleIds, 3),
      user: createdUsers[0]._id,
      description: chance.sentence()
    }))
  );

  const createdCollections = createdCollectionsByLoggedInUser.concat(createdCollectionsByOther);
  
  return {
    users: createdUsers,
    tags: createdTags,
    articles: createdArticles,
    trendingHistories: createdTrendingHistories,
    collections: createdCollections,
    loggedInUser: createdLoggedInUser,
  };
};
