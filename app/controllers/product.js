
var ProductModel = require('../models/product.js');
var request = require('request');

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
            if(results['hits']['total'] > 0)
            {
                res.json({data: results['hits']['hits']});
            }else{
                var token = 'DKRKHDHMZMXYIMLMWAELTMXAAKKHKKQSDZZUOCIWXYUFEZESMLQRHJMMJREQIWDM';
                var priceapi = 'http://api.priceapi.com/products/single?token='+token+'&country=gb&source=google-shopping&currentness=realtime&completeness=one_page&key=keyword&value='+keywords;
                request.get(priceapi,function(req, response){
                    if(response['statusCode'] == '200')
                    {
                        var body = JSON.parse(response['body']||'[]');
                        
                        var newProduct = new ProductModel({
                        _id : new Date().getTime(),
                        title : body.products[0].name,
                        description : body.products[0].description,
                        category : body.products[0].category_name,
                        brand : body.products[0].brand_name,
                        costPrice : body.products[0].price,
                        lastUpdated: body.products[0].updated_at });

                        newProduct.save(function (err, result) {
                            if (err) {
                                res.json({error: err});
                            } else {

                                ProductModel.search({
                                  query_string: {
                                    query: keywords
                                  }
                                }, function(err, results) {
                                  if (err) {
                                        res.json({error: err});
                                    } else {
                                        
                                        res.json({data: results['hits']['hits']});

                                        if(results['hits']['total'] > 0)
                                        {
                                            // res.json({data: results['hits']['hits']});
                                        }else{
                                            // res.json({data: 'no data'});
                                        }
                                    }
                                });

                            }
                        });

                        
                    }
                });
                
            }
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










