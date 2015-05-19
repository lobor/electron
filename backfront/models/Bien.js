var restberry = require('restberry');

restberry.model('Bien')
    .schema({
        id:{
            type: Number,
            index: {
                unique: true
            }
        },
        name: {
    		type: String,
    		required: true,
    		index: {
    			unique: true
    		}
    	}
    })
    .loginRequired()
    .routes.addCRUDRoutes();
