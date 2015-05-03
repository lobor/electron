var configDb = require("./db");
var mongoose = require("mongoose");
var mongooseTypes = require("mongoose-types");

var deferred = require('deferred');

var modelProto = mongoose.Model;


mongoose.Model.find = deferred.promisify(mongoose.Model.find);
mongoose.Model.findById = deferred.promisify(mongoose.Model.findById);



mongooseTypes.loadTypes(mongoose);

// MongoDB with Mongoosz
mongoose.connect(configDb.mongo.url, function(err) {
    if (err)
		throw err;

	console.log('Successfully connected to MongoDB');
});
