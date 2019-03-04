const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        trim: true,  
        required: true,
    },
    price: {
        type: Number,
    },
    cpu: { type: String },
    gpu: { type: String },
    quantities: { type: Number },
    rent_from: { type: Date },
    rent_to: { type: Date },
    description: { type: String },
    leased: {
        type: Boolean,
        trim: true
    },
    last_person: {
        type: String
    }
});
module.exports = mongoose.model('Product', ProductSchema)