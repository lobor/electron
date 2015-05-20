var restberry = require('restberry');
var restberryMongoose = require('restberry-mongoose');
var restberryAuthLocal = require('restberry-auth-local');

restberry.model('User')
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
    })
    .addCustomRoute({
        action: function(req, res, next) {
            var userData = req.body;
                userData.password = restberryAuthLocal.saltAndEncryptPassword(userData.password);

            var user = new restberryMongoose.mongoose.models.User(userData);
            user.save(function(err){
                if(err){
                    res.status(500);
        			res.json({error: err, user: user});
                }
                else{
                    var response = {
                        email: user.email,
                        href: "users/"+user._id,
                        id: user._id,
                        role: user.role,
                    };

        			res.status(201);
        			res.json({user: response});
                }
                next();
            });
        },
		path: 'users',
        apiPath: '/',
        loginRequired: true,
        method: 'POST',
    });
    // .addCreateRoute({
    //     loginRequired: true,
    // });
