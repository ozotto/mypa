var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var FavoriteSchema = new Schema({
  idArticle: {
    type: Schema.ObjectId,
    ref: 'Article',
    index: true
  }
});

module.exports = mongoose.model('Favorite', FavoriteSchema);