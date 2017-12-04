const express = require('express');
const router = express.Router();

const hotelsControl = require('../controllers/hotels.controllers');
const reviewsControl = require('../controllers/reviews.controllers')
const usersControl = require('../controllers/users.controllers')

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
  .post(usersControl.authenticate, reviewsControl.create);

router
  .route('/hotels/:hid/reviews/:rid')
  .get(reviewsControl.get)
  .put(reviewsControl.update)
  .delete(reviewsControl.delete);

router
  .route('/users/register')
  .post(usersControl.register);

router
  .route('/users/login')
  .post(usersControl.login);

module.exports = router;