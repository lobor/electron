var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var jwt = require('jsonwebtoken');

require('../models/User');


// code error
// 001 => not password or email
// 002 => email not find
// 003 => password incorrect

router.get('/check', function(req, res){
	if(!req.session.Auth){
		res.status(401);
		res.json({status: false});
	}
	else{
		res.status(200);
		res.json({status: true});
	}
});

router.get('/logout', function(req, res){
	req.session.destroy();
	res.json({status: true});
});

router.post('/authenticate', function (req, res) {
	var User = mongoose.model('User');
	//
 //  	var profile = new User({
    // 	email: req.body.email,
	// 	password: req.body.password,
	// 	role: 0,
	// }).save();

	if(req.body.email && req.body.password){
		var toto = User.findOne({email:req.body.email}, function(err, user){
			if (err)
				throw err;

			if(user){
				user.comparePassword(req.body.password, function(err, isMatch) {
		            if (err)
						throw err;

					if(!req.session.Auth)
						req.session.Auth = {};

					req.session.Auth = user;

				 	res.json({ status: true, user: user});
		        });
			}
			else{
				res.json({ status: false, errorCode: '002'});
			}
		});
	}
	else{
		res.json({ status: false, errorCode: '001'});
	}
});

module.exports = router;
