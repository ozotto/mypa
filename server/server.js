var express    	= require('express'); 		
var app        	= express(); 				
var bodyParser 	= require('body-parser');
var mongoose   	= require('mongoose');
var multiparty  = require('multiparty');
var util		= require('util');
var fs 			= require('fs');

var Category    = require('./app/models/category');
var Article 	= require('./app/models/article');
var File 		= require('./app/models/file');
var Historic 	= require('./app/models/historic');
var Favorite 	= require('./app/models/favorite');

mongoose.connect('mongodb://localhost:27017/mypaDB');  

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port 		= process.env.PORT || 8080; 

var router = express.Router(); 

router.use(function(req, res, next) {
	console.log('Something is happening.');
	next(); 
});

router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

//Router Articles POST-GET
router.route('/articles')
	.get(function(req, res) {
		Article.find(function(err, articles) {
			if(err)
				res.send(err);
			res.json(articles);
		})
	})

	.post(function(req, res){
		var article = new Article();
		article.title = req.body.title;
		article.content = req.body.content;
		article.category = req.body.category;
		article.created = req.body.created;

		console.log('New Article with Data '+article.created + ' with title ' + article.title + ' and Content: ' + article.content + ' and Category: ' + article.category);
		
		article.save(function(err){
			if(err)
				res.send(err);	
			res.json({ message: 'Article created with title: '+ article.title + ' and Content: ' + article.content + ' and Category: ' + article.category})
		});
	});

router.route('/articles/:_id')	
	.get(function(req, res){
		Article.findById(req.params._id, function(err, article){
			if (err)
				res.send(err);
			res.json(article);
		})
	})

	.delete(function(req,res){
		Article.remove({
			_id: req.params._id
		}, function(err, article) {
			if(err)
				res.send(err);
			res.json({ message: 'Article successfully deleted with id: ' + req.params._id  })
		});
	});

	;

//Router Categories POST - GET
router.route('/categories')
	.post(function(req, res) {		
		var category = new Category();
		category.name = req.body.name;  
		console.log('Name category: ' + category.name);
		category.save(function(err) {
			if (err)
				res.send(err);

			res.json({ message: 'Category created with name: ' + category.name  });
		});
	})

	.get(function(req, res) {
		Category.find(function(err, categories){
			if (err)
				res.send(err);
			res.json(categories);
		});
	});

//Router Category GET - PUT - DELETE
router.route('/categories/:_id')
	.get(function(req, res) {
		Category.findById(req.params._id, function(err, category) {
			if (err)
				res.send(err);
			res.json(category);
		});
	})

	.put(function(req, res) {

		Category.findById(req.params._id, function(err, category) {

			if (err)
				res.send(err);

			category.name = req.body.name;

			category.save(function(err) {
				if (err)
					res.send(err);

				res.json({ message: 'Category updated with name: ' + category.name });
			});

		});
	})

	.delete(function(req,res){
		Category.remove({
			_id: req.params._id
		}, function(err, category) {
			if(err)
				res.send(err);
			res.json({ message: 'Category successfully deleted with id: ' + req.params._id  })
		});
	});

//Router Articles in Category GET
router.route('/categories/:_id/articles')
	.get(function(req,res){
		
		Article.find({ category: req.params._id }, function(err, article) {
  			if (err) return console.error(err);
  			res.json(article);
  			//console.dir(article);
		});
	});

//Router New Photo
router.route('/upload')
	
	.post(function(req, res){
		var form = new multiparty.Form();

		form.parse(req, function(err, fields, files){

			//console.log(util.inspect(files));
			var file = new File();

			file.fieldName = files.thumbnail[0].originalFilename;
			file.data = fs.readFileSync(files.thumbnail[0].path);
			console.log(files.thumbnail[0].path );
			
			file.save(function(err) {
				if (err)
					res.send(err);

				File.findById(file, function(err, doc){
					res.contentType('image/png');
					res.send(doc.data);
				});

				//res.json({ message: 'File updated with name: ' + file.fieldName });
			});

			/*res.writeHead(200, {'content-type':'text/plain'});
			res.write('received file:');
			res.end(util.inspect(files));*/
		});
	});

router.route('/historic')
	.get(function(req, res) {
		Historic.find(function(err, historic) {
			if(err)
				res.send(err);
			res.json(historic);
		})
	})

	.post(function(req, res){
		var historic = new Historic();
		historic.idArticle = req.body.idArticle;

		console.log('New Article savec in history with id ' + historic.idArticle);
		
		historic.save(function(err){
			if(err)
				res.send(err);	
			res.json({ message: 'Article saved in historic with id: '+  historic.idArticle })
		});
	});

//Router Historic DELETE
router.route('/historic/:_id')	
	.delete(function(req,res){
		Historic.remove({
			_id: req.params._id
		}, function(err, category) {
			if(err)
				res.send(err);
			res.json({ message: 'History successfully deleted with id: ' + req.params._id })
		});
	});

router.route('/favorites')
	.get(function(req, res) {
		Favorite.find(function(err, favorites) {
			if(err)
				res.send(err);
			res.json(favorites);
		})
	})

	.post(function(req, res){
		var favorite = new Favorite();
		favorite.idArticle = req.body.idArticle;

		console.log('New Article saved in favorites  with id ' + favorite.idArticle);
		
		favorite.save(function(err){
			if(err)
				res.send(err);	
			res.json({ message: 'Article saved in favorites with id: '+  favorite.idArticle })
		});
	});	

//Router Favorites DELETE
router.route('/favorites/:_id')	
	.delete(function(req,res){
		Favorite.remove({
			_id: req.params._id
		}, function(err, category) {
			if(err)
				res.send(err);
			res.json({ message: 'Favorite successfully deleted with id: ' + req.params._id })
		});
	});

app.use('/api', router);

// START THE SERVER
// ==============================================
app.listen(port);
console.log('Magic happens on port ' + port + ' in router ' + router.route );