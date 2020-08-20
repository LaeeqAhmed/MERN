// this one is a model FILE having collection of list and file including schema
const mongoose = require('mongoose'); //mongoose=create,add,delete and store in mongodb
const Schema = mongoose.Schema; //store db schema in it
// below is the code of Schema

//.... now here is the new schema to interact NinjaSchema with the geolocation....below
const GeoSchema = new Schema({
  type: {//-->type of geometry is point
    type: String,
    default: "Point"
  },
  coordinates: {
    type: [Number],
    index: "2dsphere"
  }
});
//creating ninja schema
const NinjaSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name field is required"]
  },
  rank: {
    type: String
  },
  availability: {
    type: Boolean,
    default: false
  },
  geometry: GeoSchema
});
//creating model as a collection list
const NinjaModel = mongoose.model('ninja', NinjaSchema);
//export to use in multiple files
module.exports = NinjaModel;
