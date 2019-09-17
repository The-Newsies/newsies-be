const { Router } = require('express');
const ensureAuth = require('../middleware/ensure-auth');
const Collection = require('../models/Collection');
const User = require('../models/User');

module.exports = Router()
  .post('/', ensureAuth, (req, res, next) => {
    const { 
      name,
      articleIds,
      description
    } = req.body;

    const authid = req.user.sub;

    User
      .find({ authid: authid })
      .then(currentUser => {
        const user = currentUser[0]._id;
        Collection
          .create({ name, articleIds, description, user })
          .then(collection => {
            res.send(collection);
          })
          .catch(next);
      })
      .catch(next);
  })

  .get('/', ensureAuth, (req, res, next) => {
    const authid = req.user.sub;
    
    User
      .find({ authid })
      .then(currentUser => {
        const user = currentUser[0]._id;

        Collection
          .find({ user })
          .then(collections => res.send(collections))
          .catch(next);
      })
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Collection
      .findById(req.params.id)
      .then(collection => res.send(collection))
      .catch(next);
  });
