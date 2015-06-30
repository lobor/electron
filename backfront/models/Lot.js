var restberry = require('restberry');

restberry.model('Lot')
    .schema({
        name: {
    		type: String,
    		required: true
    	}
    })
    .loginRequired()
    .routes
    .addCRUDRoutes();
