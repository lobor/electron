var restberry = require('restberry');

restberry.model('Associe')
    .schema({
        nom: {
    		type: String,
    		required: true,
    	},
        prenom: {
    		type: String,
    		required: true
    	},
        address: {
    		type: String,
    		required: true
    	},
        sci : {
            type: restberry.odm.ObjectId,
            ref: 'Sci'
        },
        cp : {
            type: Number,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        birthday: {
            type: Date,
            required: true
        },
        city_birthday: {
            type: String,
            required: true
        },
        np_part: {
            type: Number,
            required: true
        },
        percent_part: {
            type: Number,
            required: true
        }
    })
    .routes.addCRUDRoutes();
