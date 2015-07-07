var restberry = require('restberry');

restberry.model('Locataire')
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
	})
	.loginRequired()
	.routes
	.addCreateRoute()
    .addDeleteRoute()
    .addPartialUpdateRoute()
    .addReadManyRoute()
    .addReadRoute()
    .addUpdateRoute();
