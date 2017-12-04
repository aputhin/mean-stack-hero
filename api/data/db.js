const mongoose = require('mongoose');
const dburl = 'mongodb://localhost:27017/meanHotel';

mongoose.connect(dburl);

mongoose.connection
  .on('connected', () => {
    console.log('Mongoose connected to ' + dburl);
  })
  .on('disconnected', () => {
    console.log('Mongoose disconnected');
  })
  .on('error', (err) => {
    console.log('Mongoose connection error: ' + err);
  });

process
  .on('SIGINT', () => {
    mongoose.connection.close( () => {
      console.log('Mongoose disconnected through app termination (SIGINT)');
      process.exit(0);
    });
  })
  .on('SIGTERM', () => {
    mongoose.connection.close( () => {
      console.log('Mongoose disconnected through app termination (SIGTERM)');
      process.exit(0);
    });
  })
  .once('SIGUSR2', () => {
    mongoose.connection.close( () => {
      console.log('Mongoose disconnected through app termination (SIGUSR2)');
      process.exit(process.pid, 'SIGUSR2');
    });
  });

require('./models/hotels.model');
require('./models/users.model');
