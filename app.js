var express = require('express');
var morgan = require('morgan');
var compress = require('compression');
var port = process.env.PORT || 3000;
var app = express();

app.use(morgan('dev'));
app.use(compress());
app.use(express.static(__dirname + '/dist'));
app.listen(port);
