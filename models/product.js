'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = Schema({
  name : String,
  picture: String,
  price: {type: Number, default: 0},
  category: {type: String, enum: ['computers','phones', 'accesories']},
  description: String,
  create_at: {type: Date, default: Date.now}
});


//Para exportarlo como modelo y no mande error de constructor
module.exports = mongoose.model('Product', ProductSchema);
