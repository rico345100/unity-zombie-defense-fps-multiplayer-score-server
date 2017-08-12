"use strict";
const mongoDB = require(__base + '/mongodb');
const collectionName = 'Users';

function get(find, options) {
	find = find || {};
	options = options || {};

	let filter = options.filter || {};

	let db = mongoDB.get();
	let col = db.collection(collectionName).find(find, filter);

	if(options.pagePer && options.page) {
		let pagePer = +options.pagePer;
		let page = +options.page;
		
		col.skip((page - 1) * pagePer).limit(pagePer);
	}
	if(options.limit) {
		col.limit(+options.limit);
	}

	let sort = options.sort || {};
	sort._id = -1;

	return col.sort(sort).toArray();
}

function count(find, options) {
	find = find || {};
	options = options || {};

	let db = mongoDB.get();

	return db.collection(collectionName).count(find);
}

function create(data, options) {
	options = options || {};

	let db = mongoDB.get();

	return db.collection(collectionName).insert(data);
}

function update(find, data, options) {
	find = find || {};
	options = options || {};

	let db = mongoDB.get();

	return db.collection(collectionName).update(find, data);
}

module.exports = {
	get: get,
	count: count,
	create: create,
	update: update
};