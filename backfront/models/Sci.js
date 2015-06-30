var restberry = require('restberry');
var _ = require('underscore');

restberry
    .model('Sci')
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
        address: {
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
    .preRemove(function(next) {
        var Bien = restberry.model('Bien');
        Bien.remove({sci: this.id}, next);
    })
    .loginRequired()
    .routes
    .addCRUDRoutes({
        actions: {
            bien: function(req, res, next){
                var Bien = restberry.model('Bien');
                var query = {

                };
                Bien
                    .find(query, function(scis){
                        scis.toJSON(function(json) {
                            Bien.hrefs(query, function(hrefs) {
                                json = _.extend(hrefs, json);
                                res._body = json;
                                next(json);
                            });
                        });
                    });
            }
        }
    });
