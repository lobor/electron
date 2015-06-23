var restberry = require('restberry');
var restberryExpress = require('restberry-express');
var restberryMongoose = require('restberry-mongoose');
var restberryError = require('restberry-errors');
// var restberryAuth = require('restberry-auth');
var restberryAuthLocal = require('restberry-auth-local');
var RestberryObj = require('./node_modules/restberry/lib/obj');
// var session = require('express-session');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

var secret = 'shhhhhhared-secret';
var token;

RestberryObj.prototype.__isAuthorized = function(next, onError) {
	var self = this;
	if(token){
		next(true);
	}
	else{
		var err = {message: 'Can\'t authorize without an enabled auth.'};
        self.onError(restberryError.Unauthenticated, err, onError);
	}
};

restberry
	.config({
		apiPath: '',
		port: 3000,
		name: 'locloud',
	})
	// .use(restberryAuth.use(function (auth) {
	// 		auth.restberry.waf.app.use(jwt({
	// 				secret: secret
	// 			})
	// 			.unless({
	// 				path: ['/auth/check']
	// 			})
	// 		);
	// 		// auth.restberry.waf.app.use(session({
	// 		// 	secret: 'yoursecret',
	// 		// 	name: 'Auth',
	// 		// 	resave: false,
	// 		// 	saveUninitialized: false,
	// 		// 	cookie: {
	// 		// 		path: '/',
	// 		// 		domain: false,
	// 		// 		maxAge: 10000 * 60 * 24, // 24 hours,
	// 		// 		httpOnly: true
	// 		// 	}
	// 		// }));
	// 		// auth.restberry.waf.app.use(auth.passport.initialize());
	// 		// auth.restberry.waf.app.use(auth.passport.session());
	// 	})
	// 	// .use(restberryAuthLocal.config({
	// 	// 	passwordMinLength: 6,
	// 	// 	additionalFields: {
	// 	// 		nom: {
	// 	// 			type: String,
	// 	// 		},
	// 	// 		prenom: {
	// 	// 			type: String,
	// 	// 		},
	// 	// 		role: {
	// 	// 			type: String,
	// 	// 			required: true
	// 	// 		}
	// 	// 	}
	// 	// })))
    // )
	.use(restberryExpress.use(function (waf) {
		waf
            .app
            .use(function (req, res, next) {
    			res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    			res.header('Access-Control-Allow-Origin', 'http://local.locloud.com');
    			res.header('Access-Control-Allow-Credentials', true);
    			res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

    			next();
    		})
            .use(expressJwt({
                    secret: secret
                })
                .unless({
                    path: ['/login']
                }));
	}))
	.use(restberryMongoose.use(function (odm) {
		odm.connect('mongodb://localhost:27017/locloud');
	}))
	.listen();




restberry
	.routes
	.addCustomRoute({
		action: function (req, res, next) {
            var email = req.body.email;
            var password  = req.body.password;
            restberry
                .model('User')
                .findOne({email: email}, function(response){
                    if(response.error){
                        res
                            .status(200)
                            .json({ error: 'Utilisateur non enregistré', status: false });
                    }
                    else{
                        var salt = response._obj.password.salt;
                        if(restberryAuthLocal.encryptPassword(password, salt) === response._obj.password.encrypted){
                            token = jwt.sign(response._obj, secret, { expiresInMinutes: 60*5 });
                            res
                                .status(200)
                                .json({token: token, status: true, role: response._obj.role});
                        }
                        else{
                            res
                                .status(200)
                                .json({status: false, msg: 'Mauvais mot de passe' });
                        }
                    }
                    next();
                });
		},
		path: 'login',
		apiPath: '/', // overrides the one set on Restberry
		loginRequired: false,
		method: 'POST',
		verbose: false
	});


require('./models/bootstrap');
