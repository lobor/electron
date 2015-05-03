var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

require('../models/User');



router.post('/authenticate', function (req, res) {
	res.header("Access-Control-Allow-Origin", "http://www.filecloud.local");
  	res.header("Access-Control-Allow-Headers", "X-Requested-With");

	var User = mongoose.model('User');
	//
 //  	var profile = new User({
    // 	email: req.body.email,
	// 	password: req.body.password,
	// 	role: 0,
	// }).save();


	var toto = User.findOne({email:req.body.email}, function(err, user){
		if (err)
			throw err;


		// console.log(user);

		user.comparePassword(req.body.password, function(err, isMatch) {
            if (err)
				throw err;

			if(!req.session.Auth)
				req.session.Auth = {};

			req.session.Auth = user;
		  	res.json({ status: true});
        });


	});
});

// router.get('/auth/api/restricted', function (req, res) {
// 	// res.json(req.session);
// 	res.status(401);
//   	res.json({
//     	error: 'foo'
//   	});
// });


module.exports = router;
