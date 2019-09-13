const { Router } = require('express');
const History = require('../models/History');

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
  });
