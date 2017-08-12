"use strict";
global.__base = __dirname;
const config = require('./config/app.json');
global.isDev = config.environment || 'development';

const express = require('express');
const methodOverride = require('method-override');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const db = require('./mongodb');

const app = express();
const router = require('./router');
const PORT = 5010;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', 'http://modernator.me:5011');
	next();
});

app.use(methodOverride(function (req, res) {
	if (req.body && typeof req.body === 'object' && '_method' in req.body) {
		// look in urlencoded POST bodies and delete it 
		var method = req.body._method;
		delete req.body._method;
		return method;
	}
}));

// Disable Searching
app.get('/robots.txt', function (req, res) {
    var robots = `User-agent: *\n`;
    robots += `Disallow: /`;
    
    res.type('text/plain');
    res.send(robots);
});

// Use Routings
app.use(router);

app.use((req, res, next) => {
	next({
		status: 404,
		message: 'Not Found'
	});
});

// error handler
app.use((err, req, res, next) => {
	if(global.isDev) {
		console.error(err.message);
		console.error(err.stack);
	}

	res.status(err.status || 500).json({
		message: err.message,
		stack: global.isDev ? err.stack : {}
	});
});

app.listen(PORT, () => {
    console.log(`Simple Zombie FPS Scoring Server listening at port 127.0.0.1:${PORT}`);
});