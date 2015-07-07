var restberry = require('restberry');
var restberryExpress = require('restberry-express');
var restberryMongoose = require('restberry-mongoose');
var restberryError = require('restberry-errors');
var restberryAuthLocal = require('restberry-auth-local');
var RestberryObj = require('./node_modules/restberry/lib/obj');
var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');
var multer = require('multer');
var unless = require('express-unless');
var fs = require('fs');

var secret = 'shhhhhhared-secret';
var token;

RestberryObj.prototype.__isAuthorized = function (next, onError) {
	var self = this;
	if (token) {
		next(true);
	} else {
		var err = {
			message: 'Can\'t authorize without an enabled auth.'
		};
		self.onError(restberryError.Unauthenticated, err, onError);
	}
};

restberry
	.config({
		apiPath: '',
		port: 3000,
		name: 'locloud',
	})
	.use('express', function (waf) {
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
					path: ['/login', /\/assets\/(lots|scis|biens)\/[a-zA-Z0-9]+\.(jpg|png|gif)/i]
				}))
			.use(multer({
				dest: './assets/',
				changeDest: function (dest, req, res) {
					if (/lots/.test(req.originalUrl)) {
						dest += 'lots/'
					} else if (/scis/.test(req.originalUrl)) {
						dest += 'scis/'
					} else if (/biens/.test(req.originalUrl)) {
						dest += 'biens/'
					}
					return dest;
				}
			}))
			.use('/assets', waf.express.static('assets'));
	})
	.use('mongoose', function (odm) {
		odm.connect('mongodb://localhost:27017/locloud');
	})
	.listen();




restberry
	.routes
	.addCustomRoute({
		action: function (req, res, next) {
			var email = req.body.email;
			var password = req.body.password;
			restberry
				.model('User')
				.findOne({
					email: email
				}, function (response) {
					if (response.error) {
						res
							.status(200)
							.json({
								error: 'Utilisateur non enregistré',
								status: false
							});
					} else {
						var salt = response._obj.password.salt;
						if (restberryAuthLocal.encryptPassword(password, salt) === response._obj.password.encrypted) {
							token = jwt.sign(response._obj, secret, {
								expiresInMinutes: 60 * 5
							});
							res
								.status(200)
								.json({
									token: token,
									status: true,
									role: response._obj.role
								});
						} else {
							res
								.status(200)
								.json({
									status: false,
									msg: 'Mauvais mot de passe'
								});
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
