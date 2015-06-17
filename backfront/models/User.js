var restberry = require('restberry');
var restberryMongoose = require('restberry-mongoose');
// var restberryAuthLocal = require('restberry-auth-local');

restberry
    .model('User')
    .schema({
        email: {
    		type: String,
    		required: true,
    		index: {
    			unique: true
    		}
    	},
        password: {
            type: {
                encrypted: {type: String},
                salt: {type: String},
            },
            hidden: true,
    	},
        nom: {
            type: String,
    		required: true
        },
        prenom: {
            type: String,
    		required: true
        },
        role : {
            type: String,
    		required: true
        }
    })
    .routes
    .addReadManyRoute({
        loginRequired: true,
    })
    .addReadRoute({
        loginRequired: true,
        fieldName: [
            'id',
            'nom'
        ]
    });
    // .addCustomRoute({
    //     action: function(req, res, next) {
    //         var userData = req.body;
    //             userData.password = restberryAuthLocal.saltAndEncryptPassword(userData.password);
    //
    //         var user = new restberryMongoose.mongoose.models.User(userData);
    //         user.save(function(err){
    //             if(err){
    //                 res.status(500);
    //     			res.json({error: err, user: user});
    //             }
    //             else{
    //                 var response = {
    //                     email: user.email,
    //                     href: "users/"+user._id,
    //                     id: user._id,
    //                     role: user.role,
    //                 };
    //
    //     			res.status(201);
    //     			res.json({user: response});
    //             }
    //             next();
    //         });
    //     },
	// 	path: 'users',
    //     apiPath: '/',
    //     loginRequired: true,
    //     method: 'POST',
    // });
    // .addCreateRoute({
    //     loginRequired: true,
    // });
