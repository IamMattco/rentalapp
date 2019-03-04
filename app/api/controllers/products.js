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
  productModel.find({}, function(err, products){
    if (err){
      next(err);
    } else{
      for (let product of products) {
        if (query !== undefined && query.length > 0) {
          if (product.name.includes(query) === true || product.price === query || product.description.includes(query) === true) {
            productsList.push({id: product._id, name: product.name, leased: product.leased, price: product.price, cpu: product.cpu, gpu: product.gpu, description: product.description});
          }
        } else {
          productsList.push({id: product._id, name: product.name, leased: product.leased, price: product.price, cpu: product.cpu, gpu: product.gpu, description: product.description});
        }
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
 },
}