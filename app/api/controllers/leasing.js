const leasingModel = require('../models/leasing');
module.exports = {
    getAll: function(req, res, next) {
    var query = req.query.query;
    let leasingList = [];
    leasingModel.find({}, function(err, leasing){
        if (err){
        next(err);
        } else{
        for (let les of leasing) {
            leasingList.push({id: les._id, user_id: les.user_id, product_id: les.product_id, rent_from: les.rent_from, rent_to: les.rent_to});
        }
        res.json({status:"success", message: "History list found!!!", data:{leasing: leasingList}});
            
        }
    });
    },
    create: function(req, res, next) {
        leasingModel.create({user_id: req.body.user_id, product_id: req.body.product_id, rent_from: req.body.rent_from, rent_to: req.body.rent_to}, function (err, result) {
            if (err) 
                next(err);
            else
                res.json({status: "success", message: "Product leased!!!", data: null});
        });
    },
}