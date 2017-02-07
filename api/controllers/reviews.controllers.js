const mongoose = require('mongoose');
const Hotel = mongoose.model('Hotel');

module.exports.getAll = (req, res) => {
  let hid = req.params.hid;

  Hotel
    .findById(hid)
    .select('reviews')
    .exec((err, hotel) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (!hotel) {
        return res.status(404).json({ message: 'Hotel ID not found' });
      }
      res.status(200).json( hotel.reviews ? hotel.reviews : [] );
    });
}

module.exports.get = (req, res) => {
  var hid = req.params.hid,
      rid = req.params.rid;

  Hotel
    .findById(hid)
    .select('reviews')
    .exec((err, hotel) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (!hotel) {
        return res.status(404).json({ message: 'Hotel ID not found' });
      }
      
      let review = hotel.reviews.id(rid);
      if (!review) {
        return res.status(404).json({ message: 'Review ID not found' });
      }
      res.status(200).json( review );
    });
}

const _addReview = (req, res, hotel) => {
  hotel.reviews.push({
    name: req.body.name,
    rating: parseInt(req.body.rating, 10),
    review: req.body.review
  });

  hotel.save((err, hotel) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.status(201).json(hotel.reviews[hotel.reviews.length - 1]);
  });
}

module.exports.create = (req, res) => {
  let hid = req.params.hid;

  Hotel
    .findById(hid)
    .select('reviews')
    .exec((err, hotel) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (!hotel) {
        return res.status(404).json({ message: 'Hotel ID not found' });
      }
      _addReview(req, res, hotel);
    });
}

module.exports.update = (req, res) => {
  var hid = req.params.hid,
      rid = req.params.rid;

  Hotel
    .findById(hid)
    .select('reviews')
    .exec((err, hotel) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (!hotel) {
        return res.status(404).json({ message: 'Hotel ID not found' });
      }
      
      let review = hotel.reviews.id(rid);
      if (!review) {
        return res.status(404).json({ message: 'Review ID not found' });
      }

      review.name = req.body.name;
      review.rating = parseInt(req.body.rating, 10);
      review.review = req.body.review;

      hotel.save((err, hotel) => {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(204).json();
      });
    });
}

module.exports.delete = (req, res) => {
  var hid = req.params.hid,
      rid = req.params.rid;

  Hotel
    .findById(hid)
    .select('reviews')
    .exec((err, hotel) => {
      if (err) {
        return res.status(500).json(err);
      }
      if (!hotel) {
        return res.status(404).json({ message: 'Hotel ID not found' });
      }
      
      let review = hotel.reviews.id(rid);
      if (!review) {
        return res.status(404).json({ message: 'Review ID not found' });
      }

      hotel.reviews.id(rid).remove();
      
      hotel.save((err, hotel) => {
        if (err) {
          return res.status(500).json(err);
        }
        return res.status(204).json();
      });
    });
}