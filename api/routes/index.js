const express = require('express');
const router = express.Router();

const hotelsControl = require('../controllers/hotels.controllers.js');

router
  .route('/hotels')
  .get(hotelsControl.getAll);

router
  .route('/hotels/:id')
  .get(hotelsControl.get);

  router
    .route('/hotels/add')
    .post(hotelsControl.create);

module.exports = router;