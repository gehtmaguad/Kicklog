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
	color: {
		type: String, 
		trim: true,
		default: '#FFFFFF'
	}, 	
	description: {
		type: String,
		default: '',
		required: 'Please fill Activity description',
		trim: true /*Removes Whitespace from Beginning and End from String */
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
		{ 
			entryText: {
				type: String, 
				trim: true
			}, 
			entryDate: {
				type: Date,
				default: Date.now()
			}, 
			entryDatePicker: {
				type: Date,
				default: Date.now()
			},
			entryDuration: {
				type: Number, 
				trim: true,
				default: 0
			},
			entryDescription: {
				type: String, 
				default: 'empty',
				trim: true
			}			
		}
	]
});

mongoose.model('Activity', ActivitySchema);
