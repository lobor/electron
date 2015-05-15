var restberry = require('restberry');

restberry.model('Sci')
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
    	},
        rcs: {
    		type: Number,
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
        adress: {
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
            type: restberry.odm.ObjectId,
            ref: 'Associe'
        }]
    })
    .loginRequired()
    .routes.addCRUDRoutes();
