var mongoose = require('mongoose'),
	mongoosastic = require('mongoosastic'),
	Schema       = mongoose.Schema;


var Images = new mongoose.Schema({ src: String, height: String, width: String}),
	Specs = new mongoose.Schema({name:String, value:String}),
	Attrs = new mongoose.Schema({name:String, value:String}),
	Sku = new mongoose.Schema({id:String, attrs:{Attrs}, quantity:Number });

var Product = new Schema({
	  
	  _id : String,
	  title: {type:String, es_indexed:true},
	  category: {type:String, es_indexed:true},
	  costPrice: Number,
	  sellPrice: Number,
	  brand: {id: String, name: {type:String, es_indexed:true}, img: String},
	  images:[Images],
	  shipping: {weight:String, dimensions:{height:String,length:String, width:String}},
	  sku: [Sku],
	  specs:[Specs],
	  description: {type:String, es_indexed:true},
	  lastUpdated: String,
	  
	}, {collection: "products"}

);

Product.plugin(mongoosastic,{ hosts: [ 'localhost:9200'] } );


Product.pre ("save", function (next) {
    next ();
});

Product.static ('findAll', function (callback) {
    return this.find ({}).exec (callback);
});

var ProductModel = mongoose.model('products', Product);


module.exports = ProductModel;

