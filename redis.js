"use strict";
const redis = require('redis');
const client = redis.createClient();

module.exports = {
	client: client,
	get: function(key) {
		return new Promise((resolve, reject) => {
			client.get(key, (err, replies) => {
				if(err) {
					return reject(err);
				}

				resolve(replies);
			});
		});
	},
	set: function(key, value) {
		return new Promise((resolve, reject) => {
			client.set(key, value, (err, replies) => {
				if(err) {
					return reject(err);
				}

				resolve(replies);
			});
		});
	},
	del: function(key) {
		return new Promise((resolve, reject) => {
			client.del(key, (err, replies) => {
				if(err) {
					return reject(err);
				}

				resolve(replies);
			});
		});
	}
};