var restberry = require('restberry');
var _ = require('underscore');
var promise = require('bluebird');

restberry.model('Lot')
    .schema({
        sci: {
            type: restberry.odm.ObjectId,
			ref: 'Sci'
    	},
        bien: {
            type: restberry.odm.ObjectId,
			ref: 'Bien'
    	},
        type: {
    		type: String,
    		required: true
    	},
        identifiant: {
    		type: String,
    		required: true
    	},
        surface: {
    		type: String,
    		required: true
    	},
        nb_piece: {
    		type: String,
    		required: true
    	},
        description: {
    		type: String
    	},
        note: {
    		type: String
    	},
        photos: [{
			type: String
		}]
    })
    .loginRequired()
    .routes
    .addReadManyRoute({
        postAction: function(json, req, res, next){
            var modelBien = restberry.model('Bien');
            var modelSci = restberry.model('Sci');
            promise
                .map(json.lots, function(lot, key){
                    var deffered = promise.defer();
                    modelBien
                        .findById(lot.bien.id, function(bien){
                            json.lots[key].bien = bien._obj.name;
                            modelSci
                                .findById(lot.sci.id, function(sci){
                                    json.lots[key].sci = sci._obj.name;
                                    deffered.resolve(sci._obj.name);
                                });
                        });
                    return deffered.promise;

                })
                .then(function(){
                    next(json);
                });
        }
    })
    .addCreateRoute({
        preAction: parseFile
    })
    .addPartialUpdateRoute({
        preAction: parseFile
    })
    .addCRUDRoutes();

function parseFile(req, res, next){
    // console.log(req);
    // console.log(req.query);
}
