const express = require('express');
const path = require('path');
const db = require('./api/data/db.js');
const routes = require('./api/routes');
const bodyParser = require('body-parser');

const app = express();

app.set('port', 3000);

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/node_modules', express.static(path.join(__dirname, 'node_modules')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', routes);

const server = app.listen(app.get('port'), () => {
  let port = server.address().port;
  console.log('Magic happens on port ' + port);
});