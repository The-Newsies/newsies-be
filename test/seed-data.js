const User = require('../lib/models/User');
const Tag = require('../lib/models/Tag');

const chance = require('chance').Chance();

module.exports = async({ users = 5, tags = 5 } = {}) => {
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

  return {
    users: createdUsers,
    tags: createdTags
  };
};
