var express = require('express');
var mongoose = require('mongoose');
var _ = require('underscore');
var router = express.Router();

var Promise = require("bluebird");

require('../models/Sci');
require('../models/Associe');

var Sci = mongoose.model('Sci');
var Associe = mongoose.model('Associe');

router.get('/list', function (req, res) {
	Sci.
		find(req.body, function(err, sci){
			// console.log(sci.associe);
			res.json({
				status: true,
				results: sci,
			});
		});
});

router.get('/get', function (req, res) {

	Sci.
		findOne({_id:req.query.id}).populate('associes').exec(function(err, sci){
			res.json({
				status: true,
				results: sci,
			});
		});
});

router.post('/update', function (req, res) {

	Sci.findOne({_id: req.body._id}).exec(function(err, sci){
		if(err){
			res.json({ status: false});
		}
		else{
			var result = [];
			var promises = req.body.associes.map(function(associe){
				if(!associe._id){
					associe.sci = sci._id;
					new Associe(associe).save(function(err, associe){
						result.push(associe._id);
						return associe
					});
					return result;
				}
				else{
					var data = _.extend({},associe);
					delete data._id;
					delete data.__v;
					result.push(associe._id);
					var toto = Associe.findOneAndUpdate({_id: associe._id},data, function(err, results){});
				}
			});


			Promise
				.props({associes:promises})
				.then(function(data){
					sci.associes = result;

					sci.save(function(error){
						if(error){
							res.json({
								status: false,
								error: error
							});
						}
						else{
							Sci.
								findOne({_id:sci._id}).populate('associes').exec(function(err, sci){
									if(err){
										res.json({
											status: false,
											error: err
										});
									}
									else{
										res.json({
											status: true,
											results: sci,
										});
									}
								});
						}
					});
				});
		}
	});
});

router.delete('/suppAssocie', function (req, res) {

	Sci.
		findOne({_id: req.body._id}, function(err, sci){
			console.log('_______________ error find sci _______________');
			console.log(err);

			for(var i = 0; i < req.body.associe.length; i++){
				// console.log(req.body.associe[i]);
				var associe = new Associe(req.body.associe[i])
				associe.sci = req.body._id;
				associe.save(function(err){
					console.log('_______________ error save associe _______________');
					console.log(err);
				});
				sci.associe.push(associe._id)
			}
			sci.save(function(err){
				console.log('_______________ error save sci _______________');
				console.log(err);
			});
			res.json({
				status: true,
				results: sci,
			});
		});
});




router.post('/create', function (req, res) {
  	var sci = new Sci(req.body);

	var promises = req.body.associes.map(function(associe){
		associe.sci = sci._id;
		return new Associe(associe).save(function(err, associe){
			return associe
		});
	});

	Promise.props({associes:promises})
	.then(function(data){
		for(var i = 0; i < data.associes.length; i++){
			sci.associes.push(data.associes[i].emitted.fulfill[0]._id);
		}

		sci.save();
		res.json({ status: false});
	})
	.catch(function(error){
		res.json({ status: true});
	}).done();
});


module.exports = router;
