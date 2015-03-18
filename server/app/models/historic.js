var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var HistoricSchema = new Schema({
  idArticle: {
    type: Schema.ObjectId,
    ref: 'Article',
    index: true
  }
});

module.exports = mongoose.model('Historic', HistoricSchema);