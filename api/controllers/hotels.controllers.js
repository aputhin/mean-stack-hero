const data = require('../data/hotel-data.json');

module.exports.getAll = (req, res) => {
    res
      .status(200)
      .json({ data });
};