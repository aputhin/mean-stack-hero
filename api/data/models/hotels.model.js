const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true
  },
  review: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    "default": Date.now
  }
});

const roomSchema = new Schema({
  type: String,
  number: Number,
  description: String,
  photos: [String],
  price: Number
});

const hotelSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  stars: {
    type: Number,
    min: 0,
    max: 5,
    'default': 0
  },
  services: [String],
  description: String,
  photos: [String],
  currency: String,
  reviews: [reviewSchema],
  rooms: [roomSchema],
  location: {
    address: String,
    // long, lat
    coordinates: { 
      type: [Number],
      index: '2dsphere'
    }
  }
});

mongoose.model('Hotel', hotelSchema);