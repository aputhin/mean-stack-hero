const data = require('../data/hotel-data.json');

module.exports.getAll = (req, res) => {
  let offset = 0,
      count = 5;

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  let returnData = data.slice(offset, offset + count);

  res
    .status(200)
    .json({ returnData });
};

module.exports.get = (req, res) => {
  let id = req.params.id;
  let hotel = data[id];

  if (hotel === undefined) {
    return res.status(422).send();
  } 

  return res
    .status(202)
    .json({ hotel });
};

module.exports.create = (req, res) => {
  res
    .status(200)
    .json(req.body);
};