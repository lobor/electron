var restberry = require('restberry');
var restberryMongoose = require('restberry-mongoose');
var Promise = require("bluebird");
var moment = require("moment");

restberry.model('Sci')
    .schema({
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
    .routes
    .addCustomRoute({
        action: function(req, res, next){
            var sci = new restberryMongoose.mongoose.models.Sci(req.body);

        	var promises = req.body.associes.map(function(associe){
        		associe.sci = sci._id;
                associe.birthday = moment(associe.birthday, 'DD/MM/YYYY');
        		return new restberryMongoose.mongoose.models.Associe(associe).save(function(err, dataAssocie){
                    console.log(dataAssocie)
        			return dataAssocie;
        		});
        	});

        	Promise.props({associes:promises})
        	.then(function(data){
                console.log(data.associes)
        		// for(var i = 0; i < data.associes.length; i++){
        		// 	sci.associes.push(data.associes[i].emitted.fulfill[0]._id);
        		// }
        		// sci.save(function(err){
                //     if(err){
                //         res.json({ status: false, error: err});
                //     }
                //     else{
                //         res.json({ status: true});
                //     }
                // });
        	})
        	.catch(function(error){
                console.log(arguments);
        		res.json({ status: false, error:error, catch:true});
        	}).done();
        },
        path: '/scis',
        loginRequired: true,
        method: 'POST'
    })
    .addCRUDRoutes();
