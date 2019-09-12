const { Router } = require('express');
const User = require('../models/User');
const ensureAuth = require('../middleware/ensure-auth');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    const {
      name,
      avatar
    } = req.body;

    const authid = req.user.sub;

    User
      .create({ name, avatar, authid })
      .then(user => {
        res.send(user);
      })
      .catch(next);
  })
  .get('/', ensureAuth, (req, res, next) => {
    User
      .find()
      .then(users => res.send(users))
      .catch(next);
  });
