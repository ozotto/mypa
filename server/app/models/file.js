var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var fileSchema = new Schema({
  fieldName: {
    type: String
  },
  data: {
    type: Buffer
  }
});

module.exports = mongoose.model('File', fileSchema);

/*
fieldName: 'thumbnail',
       originalFilename: 'boy.jpg',
       path: '/var/folders/yv/dd4tf85n1wv88g0yn9kmr3080000gn/T/msJ0SZmpwF6vbEqXoW3-DWru.jpg',
       headers: [Object],
       size: 15454 

       */