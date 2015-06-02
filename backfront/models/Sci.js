var restberry = require('restberry');
var restberryMongoose = require('restberry-mongoose');
var Promise = require("bluebird");
var moment = require("moment");

restberry.model('Sci')
    .schema({
        name: {
    		type: String,
    		required: true,
    		index: {
    			unique: true
    		}
    	},
        rcs: {
    		type: Number,
    		required: true
    	},
        date_immatriculation: {
    		type: Date,
    		required: true
    	},
        capital: {
    		type: Number,
    		required: true
    	},
        naf: {
    		type: String,
    		required: true
    	},
        adress: {
    		type: String,
    		required: true
    	},
        cp: {
    		type: Number,
    		required: true
    	},
        city: {
    		type: String,
    		required: true
    	},
        nb_part: {
    		type: Number,
    		required: true
    	},
        associes:[{
            type: restberry.odm.ObjectId,
            ref: 'Associe'
        }]
    })
    .loginRequired()
    .routes
    .addCRUDRoutes();
