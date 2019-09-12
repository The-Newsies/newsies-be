const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  tags: {
    type: [mongoose.Schema.Types.ObjectId],
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

module.exports = mongoose.model('User', userSchema);
