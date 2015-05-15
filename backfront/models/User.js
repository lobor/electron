var restberry = require('restberry');

restberry.model('User')
    .schema({
        email: {
    		type: String,
    		required: true,
    		index: {
    			unique: true
    		}
    	},
        password: {
    		type: String,
    		required: true
    	},
        role: {
    		type: Number,
    		required: true
    	}
    })
    .loginRequired()
    .routes.addCRUDRoutes();
