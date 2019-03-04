const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;

const LeasingSchema = new Schema({
    user_id: {
        type: String
    },
    product_id: {
        type: String,
    },
    rent_from: { type: Date },
    rent_to: { type: Date }
});
module.exports = mongoose.model('Leasing', LeasingSchema)