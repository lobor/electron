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
		}]
	})
	.loginRequired()
	.routes.addCRUDRoutes({
		parentModel: 'Sci',
	});
