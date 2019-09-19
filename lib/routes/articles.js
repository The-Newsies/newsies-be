const { Router } = require('express');
const Article = require('../models/Article');
const History = require('../models/History');
const Collection = require('../models/Collection');

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
  })
  .get('/by-history/:id', (req, res, next) => {
    History
      .findById(req.params.id)
      .then(async(history) => {
        const trendingArticles = await Promise.all(history.articleIds.map((articleId) => {
          return Article
            .findById(articleId);
        })); 
        res.send(trendingArticles);  
      })
      .catch(next);
  })
  .get('/by-collection/:id', (req, res, next) => {
    Collection
      .findById(req.params.id)
      .then(async(collection) => {
        const articles = await Promise.all(collection.articleIds.map((articleId) => {
          return Article
            .findById(articleId);
        })); 
        res.send(articles);  
      })
      .catch(next);
  });
