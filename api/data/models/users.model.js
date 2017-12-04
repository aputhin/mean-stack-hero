const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
  },
  password: {
    type: String,
    required: true
  },
});

mongoose.model('User', userSchema);
