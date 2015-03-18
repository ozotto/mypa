var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ArticleSchema = new Schema({
  created: {
    type: Date
    //default: Date.now
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: Schema.ObjectId,
    ref: 'Article',
    index: true
  }
});

module.exports = mongoose.model('Article', ArticleSchema);