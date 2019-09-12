const User = require('../lib/models/User');
const chance = require('chance').Chance();

module.exports = async({ users = 5 } = {}) => {
  const createdUsers = await User.create(
    [...Array(users)].map(() => ({
      name: chance.name(),
      avatar: chance.url({ extensions: ['jpg'] }),
      authid: chance.string()
    }))
  );

  return {
    users: createdUsers
  };
};
