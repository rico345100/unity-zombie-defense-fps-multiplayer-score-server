"use strict";
const dbConfig = require('./config/db.json');
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
let db = null;
let __ready = () => {};

MongoClient.connect(`mongodb://${dbConfig.id}:${dbConfig.pw}@localhost:27017/${dbConfig.db}`)
.then((conn) => {
	console.log('MongoDB Connected.');
	db = conn;

	__ready();
})
.catch((err) => {
	console.error(err);
	console.error(err.stack);
	process.exit(1);
});

// make the program will not close instantly
process.stdin.resume();

// uncaught exception error handling for prevent node server dies
// remember, node server easily crashed on just simple exception thrown!
// domain API is deprecated so let's use process error cathing pattern
process.on('uncaughtException', function(err) {
	console.error(err);
	console.error(err.stack);
});

function closeDB() {
	// close db forcely
	db.close(true)
	.then(() => {
		db = null;
		console.log('MongoDB closed successfully.');
		process.exit(1);
	});
}

// when app is closing
process.on('SIGINT', () => {
	console.log('Detect SIGINT');
	closeDB();
});

// ctrl + c
process.on('exit', () => {
	console.log('Detect process exit. Terminate...');

	if(db) {
		console.log('DBClient still alive, force termination...');
		closeDB();
	}
});

module.exports = {
	ready: function(fn) {
		__ready = fn;
	},
	get: function() {
		return db;
	}
};