
var ProductModel = require('../models/product.js');

exports.search = function(req, res){
	var keywords = req.query.keywords;

	ProductModel.search({
	  query_string: {
	    query: keywords
	  }
	}, function(err, results) {
	  if (err) {
            res.json({error: err});
        } else {
            res.json({data: results});
        }

	});
}

exports.findall = function(req, res){

	ProductModel.findAll(function(err, result){
        if(err){
            res.json({error:err});
        }else{
            res.json({data:result});
        }
    });		
} 

exports.add = function(req, res){
	console.log(req.query);
	var newProduct = new ProductModel({
    	_id : new Date().getTime(),
    	title : req.query.title,
    	costPrice : req.query.price});

    newProduct.save(function (err, result) {
        if (err) {
            res.json({error: err});
        } else {
            res.json({status: "save success!"});
        }
    });
}

exports.remove = function(req, res){ 
	console.log(req.query);
    ProductModel.remove({ _id:req.query.id},function(err){
        if (err) {
            res.json({error: err});
        } else {
        	res.json({status: req.query.id+' is removed.'});
        }
    }).exec();
};










