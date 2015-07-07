var restberry = require('restberry');

restberry.model('Bien')
	.schema({
		name: {
			type: String,
			required: true,
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
		photos: [{
			type: String,
			required: true
		}],
		sci: {
			type: restberry.odm.ObjectId,
			ref: 'Sci'
		},
	})
	.loginRequired()
	.routes
	.addCreateRoute({
		parentModel: 'Sci'
	})
    .addDeleteRoute()
    .addPartialUpdateRoute()
    .addReadManyRoute({
		parentModel: 'Sci',
	})
    .addReadRoute()
    .addUpdateRoute();

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
                req.body.photos.push({image: req.files['file[]'][i].name, url: '/assets/biens/'});
            }
        }
        else{
            req.body.photos.push({image: req.files['file[]'].name, url: '/assets/biens/'});
        }
    }

    next();
}
