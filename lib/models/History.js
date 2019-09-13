const mongoose = require('mongoose');

const historySchema = new mongoose.Schema({
  articleIds: {
    type: [mongoose.Schema.Types.ObjectId],
    reference: 'Article'
  },
  tag: {
    type: mongoose.Schema.Types.ObjectId,
    reference: 'Tag'
  }
}, { 
  toJSON: {
    transform: function(doc, ret) {
      delete ret.__v;
    }
  },
  timestamps: true 
});

module.exports = mongoose.model('History', historySchema);
