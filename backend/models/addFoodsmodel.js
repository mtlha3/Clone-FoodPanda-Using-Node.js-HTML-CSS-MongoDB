const mongoose = require('mongoose');
const food_items_mongoose = require('mongoose');

const items_schema = food_items_mongoose.Schema;

const items_list_schema = new items_schema({
  foodid: {
    type: Number,
    unique: true,
  },
  foodname: {
    type: String,
    required: [true, 'Please add food name'],
  },
  foodprice: {
    type: Number,
    required: [true, 'Please add product price'],
  },
  url: {
    type: String,
    required: [true, 'Please add product image url'],
  },
});

const foodItmes = mongoose.model('food', items_list_schema);

module.exports = foodItmes;
