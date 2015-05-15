var restberry = require('restberry');
var restberryExpress = require('restberry-express');
var restberryMongoose = require('restberry-mongoose');
var restberryAuth = require('restberry-auth');
var restberryAuthLocal = require('restberry-auth-local');
var session = require('express-session');

restberry
    .config({
        apiPath: '',
        port: 3000,
		name: 'locloud',
    })
	.use(restberryAuth.use(function(auth) {
			auth.restberry.waf.app.use(session({
				secret: 'yoursecret',
				name: 'Auth',
				resave: false,
				saveUninitialized: false,
				cookie: {
					path: '/',
					domain: false,
					maxAge: 10000 * 60 * 24, // 24 hours,
					httpOnly: true
				}
			}));
			auth.restberry.waf.app.use(auth.passport.initialize());
			auth.restberry.waf.app.use(auth.passport.session());
    	})
        .use(restberryAuthLocal.config({
            passwordMinLength: 6,
            additionalFields: {
                role: {
            		type: String,
            		required: true
            	}
            }
        })))
    .use(restberryExpress.use(function(waf) {
		waf.app.use(function(req, res, next){
			res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
			res.header('Access-Control-Allow-Origin', 'http://local.locloud.com');
			res.header('Access-Control-Allow-Credentials', true);
			res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');

			next();
		});
    }))
    .use(restberryMongoose.use(function(odm) {
		odm.connect('mongodb://localhost:27017/locloud');
    }))
    .listen();





restberry
    .routes
	.addCustomRoute({
            action: function(req, res, next) {
				if(!req.session.passport.user){
					res.status(401);
					res.json({status: false});
				}
				else{
					res.status(200);
					res.json({status: true});
				}
				next();
            },
			path: '/check',
            apiPath: '/auth',  // overrides the one set on Restberry
            loginRequired: false,
            method: 'GET',
			verbose: false
        });

// restberry.model('User');

// var sci = require('./models/sciOld');
require('./models/bootstrap');
// console.log(sci);


// restberry.use(sci);



// restberry.model('Bar')
//     .schema({
//         foo: {type: restberry.odm.ObjectId, ref: 'Foo'},
//         name: {type: String},
//     })
//     .routes.addCRUDRoutes({
//         parentModel: restberry.model('Foo'),
//     });
