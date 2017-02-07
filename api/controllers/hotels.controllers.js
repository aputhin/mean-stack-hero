const mongoose = require('mongoose');
const Hotel = mongoose.model('Hotel');

const runGeoQuery = (req, res) => {
  var lng = parseFloat(req.query.lng),
      lat = parseFloat(req.query.lat);

  if (isNaN(lng) || isNaN(lat)) {
    res
      .status(400)
      .json({
        message: 'lng and lat should be numbers'
      });
    return;
  }

  var point = {
    type: "Point",
    coordinates: [lng, lat]
  };

  const options = {
    spherical: true,
    maxDistance: 2000,
    num: 5
  };

  return Hotel
    .geoNear(point, options, (err, res, stats) => {
      if (err) {
        res.status(500).json(err);
        return;
      }
      res.status(200).json(stats);
    });
}


module.exports.getAll = (req, res) => {

  if (req.query && req.query.lat && req.query.lng) {
    return runGeoQuery(req, req);
  }

  var offset = 0,
      count = 5,
      maxCount = 50;

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  if (isNaN(offset) || isNaN(count)) {
    res
      .status(400)
      .json({
        message: 'count and offset should be numbers'
      });
    return;
  }

  if (count > maxCount) {
    res
      .status(400)
      .json({
        message: 'count limit of ' + maxCount + ' exceeded'
      });
    return;
  }

  Hotel
    .find({})
    .skip(offset)
    .limit(count)
    .exec((err, hotels) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(200).json(hotels);
    });
};

module.exports.get = (req, res) => {
  let id = req.params.id;

  Hotel
    .findById(id)
    .exec((err, hotel) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (!hotel) {
        return res.status(404).json({ message: 'Hotel ID not found' });
      }
      res.status(200).json({ hotel });
    });
};

const _splitArray = (input) => {
  if (input && input.length > 0) {
    return input.split(";");
  }
  return [];
}

module.exports.create = (req, res) => {
  
  Hotel.create({
    name: req.body.name,
    description: req.body.description,
    stars: parseInt(req.body.stars, 10),
    services: _splitArray(req.body.services),
    photos: _splitArray(req.body.photos),
    currency: req.body.currency,
    location: {
      address: req.body.address,
      coordinates: [
        parseFloat(req.body.lng),
        parseFloat(req.body.lat)
      ]
    }
  }, (err, hotel) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(201).json({ hotel });
  });

};

module.exports.update = (req, res) => {
  let id = req.params.id;

  Hotel
    .findById(id)
    .select('-reviews -rooms')
    .exec((err, hotel) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (!hotel) {
        return res.status(404).json({ message: 'Hotel ID not found' });
      }
      hotel.name = req.body.name;
      hotel.description = req.body.description;
      hotel.stars = parseInt(req.body.stars, 10);
      hotel.services = _splitArray(req.body.services);
      hotel.photos = _splitArray(req.body.photos);
      hotel.currency = req.body.currency;
      hotel.location = {
        address: req.body.address,
        coordinates: [
          parseFloat(req.body.lng),
          parseFloat(req.body.lat)
        ]
      };

      hotel.save((err, hotel) => {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(204).json();
      });
    });
  
}

module.exports.delete = (req, res) => {
  let id = req.params.id;

  Hotel
    .findByIdAndRemove(id)
    .exec((err, hotel) => {
      if (err) {
        return res.status(500).json(err);
      }
      return res.status(204).json();
    });
}