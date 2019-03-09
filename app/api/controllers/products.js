const productModel = require('../models/products');
module.exports = {
  getById: function(req, res, next) {
    console.log(req.body);
    productModel.findById(req.params.productId, function(err, productInfo){
    if (err) {
      next(err);
    } else {
      res.json({status:"success", message: "Product found!!!", data:{products: productInfo}});
    }
    });
  },
  getAll: function(req, res, next) {
    var query = req.query.query;
    let productsList = [];

    console.log(query);
    if (query === undefined || query.length === 0) {
      _products = productModel.find({});
    } else {
      var _query = parseInt(query);
      if (isNaN(_query) === true) {
        _products = productModel.find({ name: new RegExp(query, 'i') });
      } else {
        _products = productModel.find({ price: _query });
      }
    }

    _products.exec(function(err, products){
      if (err){
        next(err);
      } else{
        for (let product of products) {
          productsList.push({id: product._id, name: product.name, leased: product.leased, price: product.price, cpu: product.cpu, gpu: product.gpu, description: product.description});
        }
        res.json({status:"success", message: "Products list found!!!", data:{products: productsList}});
          
      }
    });
  },
  updateById: function(req, res, next) {
    productModel.findByIdAndUpdate(req.params.productId,{name:req.body.name, price: req.body.price, cpu: req.body.cpu, gpu: req.body.gpu, quantities: req.body.quantities, description: req.body.description, leased: false}, function(err, productInfo){
    if(err)
      next(err);
    else {
      res.json({status:"success", message: "Product updated successfully!!!", data:null});
    }
    });
  },
  deleteById: function(req, res, next) {
    productModel.findByIdAndRemove(req.params.productId, function(err, productInfo){
    if(err)
      next(err);
    else {
      res.json({status:"success", message: "Product deleted successfully!!!", data:null});
    }
    });
  },
  create: function(req, res, next) {
    productModel.create({name:req.body.name, price: req.body.price, cpu: req.body.cpu, gpu: req.body.gpu, quantities: req.body.quantities, description: req.body.description, leased: false}, function (err, result) {
        if (err) 
        next(err);
        else
        res.json({status: "success", message: "Product added successfully!!!", data: null});
        
      });
  }
}