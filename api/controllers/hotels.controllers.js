const dbconn = require('../data/dbconnection.js');
const data = require('../data/hotel-data.json');
const ObjectId = require('mongodb').ObjectId;


module.exports.getAll = (req, res) => {
  const db = dbconn.get();
  const collection = db.collection('hotels');

  var offset = 0,
      count = 5;

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  collection
    .find({})
    .skip(offset)
    .limit(count)
    .toArray((err, docs) => {
      res
        .status(200)
        .json(docs);
    });
};

module.exports.get = (req, res) => {
  const db = dbconn.get();
  const collection = db.collection('hotels');

  let id = req.params.id;

  collection
    .findOne({
      _id: ObjectId(id)
    }, (err, hotel) => {
      if (err) {
        return res.status(422).send();
      }
      res
        .status(202)
        .json({ hotel });
    });

  
};

module.exports.create = (req, res) => {
  const db = dbconn.get();
  const collection = db.collection('hotels');
  var hotel;

  if (!(req.body && req.body.name && req.body.stars)) {
    return res
      .status(400)
      .json({ message: "Required data missing form body" });
  }

  hotel = req.body;
  hotel.stars = parseInt(req.body.stars, 10);

  collection.insertOne(hotel, (err, response) => {
    return res
      .status(201)
      .json( response.ops );
  });

};