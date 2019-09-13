const { Router } = require('express');
const Tag = require('../models/Tag');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { name, hexCode } = req.body;

    Tag
      .create({ name, hexCode })
      .then(tag => res.send(tag))
      .catch(next);
  })
  .get('/', (req, res, next) => {
    Tag
      .find()
      .then(tags => res.send(tags))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Tag
      .findById(req.params.id)
      .then(tag => res.send(tag))
      .catch(next);
  })
  .delete('/:id', (req, res, next) => {
    Tag
      .findByIdAndDelete(req.params.id)
      .then(tag => res.send(tag))
      .catch(next);
  });
