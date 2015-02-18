'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Activity Schema
 */
var ActivitySchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Activity name',
		trim: true /*Removes Whitespace from Beginning and End from String */
	},
	description: {
		type: String,
		default: '',
		required: 'Please fill Activity description',
		trim: true /*Removes Whitespace from Beginning and End from String */
	},
	active: {
		type: Boolean
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	entries: [
	]
});

mongoose.model('Activity', ActivitySchema);
