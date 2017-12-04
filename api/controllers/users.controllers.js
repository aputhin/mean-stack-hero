const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('jsonwebtoken');

module.exports.register = (req, res) => {
  const username = req.body.username;
  const name = req.body.name || null;
  const password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

  User.create({
    username,
    name,
    password,
  }, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).json(err);
    } else {
      console.log(user);
      res.status(201).json(user);
    }
  })
};

module.exports.login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username }).exec((err, user) => {
    if (err || !user) {
      console.error(err);
      res.status(404).json(err);
      return;
    }

    if (!bcrypt.compareSync(password, user.password)) {
      res.status(401).json('Unauthorized');
      return;
    }

    const token = jwt.sign({ username }, 'S3cr3t', { expiresIn: 3600 });
    res.status(200).json({ success: true, token });
  })
};

module.exports.authenticate = (req, res, next) => {
  const headerExists = req.headers.authorization;
  if (!headerExists) {
    res.status(403).json('Missing auth token');
    return;
  }

  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, 'S3cr3t', (err, decoded) => {
    if (err) {
      res.status(401).json('Unauthorized');
      return;
    }
    req.user = decoded.username;
    next();
  })
};
