var restberry = require('restberry');
var restberryMongoose = require('restberry-mongoose');
// var restberryAuthLocal = require('restberry-auth-local');

restberry
    .model('User')
    .schema({
        email: {
    		type: String,
    		required: true,
    		index: {
    			unique: true
    		}
    	},
        password: {
            type: {
                encrypted: {type: String},
                salt: {type: String},
            },
            hidden: true,
    	},
        nom: {
            type: String,
    		required: true
        },
        prenom: {
            type: String,
    		required: true
        },
        role : {
            type: String,
    		required: true
        }
    })
    .routes
    .addReadManyRoute({
        loginRequired: true,
    })
    .addReadRoute({
        loginRequired: true,
        fieldName: [
            'id',
            'nom'
        ]
    });
