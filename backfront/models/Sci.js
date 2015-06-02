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
    		type: String,
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
            nom: {
        		type: String,
        		required: true,
        	},
            prenom: {
        		type: String,
        		required: true
        	},
            address: {
        		type: String,
        		required: true
        	},
            cp : {
                type: Number,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            birthday: {
                type: Date,
                required: true
            },
            city_birthday: {
                type: String,
                required: true
            },
            np_part: {
                type: Number,
                required: true
            },
            percent_part: {
                type: Number,
                required: true
            }
        }]
    })
    .loginRequired()
    .routes
    .addCRUDRoutes();
