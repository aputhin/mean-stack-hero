const MongoClient = require('mongodb').MongoClient;
const dburl = 'mongodb://localhost:27017/meanHotel';

var _connection = null;

const open = () => {
  MongoClient.connect(dburl, (err, db) => {
    if (err) {
      console.log('DB connection failed');
      return;
    }
    _connection = db;
    console.log('DB connection open');
  });
};

const get = () => {
  return _connection;
};

module.exports = {
  open: open,
  get: get
};