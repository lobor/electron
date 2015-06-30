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
		parentModel: 'Sci',
	})
    .addDeleteRoute()
    .addPartialUpdateRoute()
    .addReadManyRoute({
		parentModel: 'Sci',
	})
    .addReadRoute()
    .addUpdateRoute();
