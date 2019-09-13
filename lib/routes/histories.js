const { Router } = require('express');
const History = require('../models/History');
const Tag = require('../models/Tag');

module.exports = Router()
  .post('/', (req, res, next) => {
    const {
      articleIds,
      tag
    } = req.body;

    History
      .create({ articleIds, tag })
      .then(history => res.send(history))
      .catch(next);
  })

  .get('/trending', (req, res, next) => {
    Tag
      .find({ name: 'trending' })
      .then(foundTag => {
        History
          .find({ tag: foundTag[0]._id })
          .sort({ createdAt: -1 })
          .limit(1)
          .then(history => {
            res.send(history[0]);
          })
          .catch(next);
      });
  });
