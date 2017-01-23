const express = require('express');
const router = express.Router();

const hotelsControl = require('../controllers/hotels.controllers.js');

router
  .route('/json')
  .get(hotelsControl.getAll)
  //.post(hotelsControl.post);

module.exports = router;