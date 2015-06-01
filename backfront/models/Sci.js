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
    .addCustomRoute({
        action: function(req, res, next){
            for(var i = 0; i < req.body.associes.length; i++){
                req.body.associes[i].birthday = moment(req.body.associes[i].birthday, 'DD MMMM YYYY', 'fr');
            }

            var sci = new restberryMongoose.mongoose.models.Sci(req.body);
            sci.save(function(err){
                if(err){
                    res.json({ status: false, error: err});
                }
                else{
                    res.json({ status: true});
                }
            });

        },
        path: '/scis',
        loginRequired: true,
        method: 'POST'
    })
    .addCRUDRoutes();
