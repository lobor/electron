var restberry = require('restberry');
var _ = require('underscore');
var promise = require('bluebird');
var fs = require('fs');

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
            image: {
        		type: String
        	},
            url: {
        		type: String
        	}
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
        preAction: parseFile,
    })
    .addDeleteRoute({
        actions: {
            pictures: function(req, res, next){
                var Lot = restberry.model('Lot');
                var img = JSON.parse(req.query.picture);
                Lot
                    .findById(req.params.id, function(lot){
                        var id;
                        _.each(lot.photos, function(picture, index){
                            if(picture.image == img.image){
                                id = picture.id;
                            }
                        });
                        lot.photos.id(id).remove();
                        lot.save(function(){
                            fs.unlink('.'+ img.url + img.image, function () {
                                res.send({
                                    status: "200",
                                    responseType: "string",
                                    response: "success"
                                });
                            });
                        });
                    });
            }
        }
    })
    .addCRUDRoutes();

function parseFile(req, res, next){
    if(req.body.photos){
        req.body.photos = JSON.parse(req.body.photos);
    }

    if(req.files['file[]']){
        if(!req.body.photos){
            req.body.photos = [];
        }

        if(_.isArray(req.files['file[]'])){
            for(var i = req.files['file[]'].length - 1; i >= 0; i--){
                req.body.photos.push({image: req.files['file[]'][i].name, url: '/assets/lots/'});
            }
        }
        else{
            req.body.photos.push({image: req.files['file[]'].name, url: '/assets/lots/'});
        }
    }

    next();
}
