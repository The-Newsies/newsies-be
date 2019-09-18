const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  source: {
    id: {
      type: String
    },
    name: {
      type: String
    }
  },
  author: {
    type: String,
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  url: {
    type: String,
    required: true
  },
  urlToImage: {
    type: String
  },
  publishedAt: {
    type: String,
    required: true
  },
  content: {
    type: String
  }
}, { 
  toJSON: {
    transform: function(doc, ret) {
      delete ret.__v;
    }
  }
});

module.exports = mongoose.model('Article', articleSchema);

