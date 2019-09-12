const { Router } = require('express');
const Article = require('../models/Article');

module.exports = Router()
  .post('/', (req, res, next) => {
    const { 
      source,
      author,
      title,
      description,
      url,
      urlToImage,
      publishedAt,
      content
    } = req.body;

    Article
      .create({
        source,
        author,
        title,
        description,
        url,
        urlToImage,
        publishedAt,
        content
      })
      .then(article => res.send(article))
      .catch(next);
  })
  .get('/:id', (req, res, next) => {
    Article
      .findById(req.params.id)
      .then(article => res.send(article))
      .catch(next);
  });
