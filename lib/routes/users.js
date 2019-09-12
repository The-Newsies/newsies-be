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
  })
  .get('/logged-in-user', ensureAuth, (req, res, next) => {
    User
      .find({ authid: req.user.sub })
      .then(user => res.send(user[0]))
      .catch(next);
  });

