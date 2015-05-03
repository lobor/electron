var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

require('../models/Sci');
require('../models/Associe');

var Sci = mongoose.model('Sci');

router.get('/list', function (req, res) {
	Sci.
		find(req.body, function(err, sci){
			res.json({
				status: true,
				results: sci,
			});
		});
});

router.get('/get', function (req, res) {
	Sci.
		find({}, function(err, sci){
			res.json({
				status: true,
				results: sci,
			});
		});
});

router.post('/create', function (req, res) {
	res.header("Access-Control-Allow-Origin", "http://www.filecloud.local");
  	res.header("Access-Control-Allow-Headers", "X-Requested-With");

	console.log(req.body);
  	var sci = new Sci(req.body).save();

	console.log(sci);

	res.json({ status: true});
	// var toto = User.findOne({email:req.body.email}, function(err, user){
	// 	if (err)
	// 		throw err;
	//
	//
	// 	// console.log(user);
	//
	// 	user.comparePassword(req.body.password, function(err, isMatch) {
    //         if (err)
	// 			throw err;
	//
	// 		if(!req.session.Auth)
	// 			req.session.Auth = {};
	//
	// 		req.session.Auth = user;
	// 	  	res.json({ status: true});
    //     });
	//
	//
	// });
});

// router.get('/auth/api/restricted', function (req, res) {
// 	// res.json(req.session);
// 	res.status(401);
//   	res.json({
//     	error: 'foo'
//   	});
// });


module.exports = router;
