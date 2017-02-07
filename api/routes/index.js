const express = require('express');
const router = express.Router();

const hotelsControl = require('../controllers/hotels.controllers');
const reviewsControl = require('../controllers/reviews.controllers')

router
  .route('/hotels')
  .get(hotelsControl.getAll)
  .post(hotelsControl.create);

router
  .route('/hotels/:id')
  .get(hotelsControl.get)
  .put(hotelsControl.update)
  .delete(hotelsControl.delete);

router
  .route('/hotels/:hid/reviews')
  .get(reviewsControl.getAll)
  .post(reviewsControl.create);

router
  .route('/hotels/:hid/reviews/:rid')
  .get(reviewsControl.get)
  .put(reviewsControl.update)
  .delete(reviewsControl.delete);

module.exports = router;