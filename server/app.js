

const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const morgan = require('morgan')
const fs = require('fs')
const path = require('path')
const serveIndex = require('serve-index')

const dirLog = './uploads'
if (!fs.existsSync(dirLog)) {
	fs.mkdirSync(dirLog)
}

const indexRouter = require('./src/routes')
const app = express()
app.use(cors());
require('./config/dbConnect')
app.use(cors())
app.use(bodyParser.json({
	limit: '500mb',
	extended: true
}));

app.use(bodyParser.urlencoded({
	limit: '500mb',
	extended: true
}));
app.use(morgan('short'))
app.use('/uploads', express.static('uploads'), serveIndex('uploads', {'icons': true}));
app.use('/videos', express.static('videos'), serveIndex('videos', {'icons': true}));
console.log(path.join(__dirname, 'uploads'))
app.use(function(req, res, next) {
  var oneof = false;
  if(req.headers.origin) {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      oneof = true;
  }
  if(req.headers['access-control-request-method']) {
      res.header('Access-Control-Allow-Methods', req.headers['access-control-request-method']);
      oneof = true;
  }
  if(req.headers['access-control-request-headers']) {
      res.header('Access-Control-Allow-Headers', req.headers['access-control-request-headers']);
      oneof = true;
  }
  if(oneof) {
      res.header('Access-Control-Max-Age', 60 * 60 * 24 * 365);
  }

  // intercept OPTIONS method
  if (oneof && req.method == 'OPTIONS') {
      res.sendStatus(200);
  }
  else {
      next();
  }
});


app.use('/nodebackend/', indexRouter)
app.use((req, res) => {
	res.status(404).json({
		'statusCode': 404,
		'success': false,
		'message': 'URL not found'
	})
})


module.exports = app
