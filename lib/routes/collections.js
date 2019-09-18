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
  })

  .patch('/:id/add-article', ensureAuth, (req, res, next) => {
    const { articleId } = req.body;
    const authid = req.user.sub;

    User
      .find({ authid })
      .then(currentUser => {
        const userId = currentUser[0]._id;
        
        Collection
          .findById(req.params.id)
          .then(collection => {
            const isArticleInCollection = collection.articleIds.includes(articleId);
            
            if(collection.user.toString() === userId.toString() && !isArticleInCollection) {
              Collection
                .findByIdAndUpdate(req.params.id, { $push: { articleIds: articleId } }, { new: true })
                .then(collection => res.send(collection))
                .catch(next);
            } else {
              const err = new Error('Action not authorized');
              err.status = 403;
              err.suppress = true;
              next(err);
            }
          });
      });
  })
  .patch('/:id/delete-article', ensureAuth, (req, res, next) => {
    const { articleId } = req.body;
    const authid = req.user.sub;

    User
      .find({ authid })
      .then(currentUser => {
        const userId = currentUser[0]._id;
        
        Collection
          .findById(req.params.id)
          .then(collection => {
            const isArticleInCollection = collection.articleIds.includes(articleId);
            if(collection.user.toString() === userId.toString() && isArticleInCollection) {
              Collection
                .findByIdAndUpdate(req.params.id, { $pull: { articleIds: articleId } }, { new: true })
                .then(collection => res.send(collection))
                .catch(next);
            } else {
              const err = new Error('Action not authorized');
              err.status = 403;
              err.suppress = true;
              next(err);
            }
          });
      });
  })
  .delete('/:id', ensureAuth, (req, res, next) => {
    const authid = req.user.sub;

    User
      .find({ authid })
      .then(currentUser => {
        const userId = currentUser[0]._id;
        Collection
          .find({ user: userId })
          .then(collection => {
            if(userId.toString() === collection[0].user.toString()) {
              Collection
                .findByIdAndDelete(req.params.id)
                .then(deleted => {
                  res.send(deleted);
                });
            } else {
              const err = new Error('Action not authorized');
              err.status = 403;
              err.suppress = true;
              next(err);
            }
          })
          .catch(next);
      })
      .catch(next);
  });
