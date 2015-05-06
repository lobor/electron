var bootstrap = require('../config/Bootstrap');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AssocieSchema = new Schema({
    nom: {
		type: String,
		required: true,
	},
    prenom: {
		type: String,
		required: true
	},
    address: {
		type: String,
		required: true
	},
    sci : {
        type: Schema.Types.ObjectId,
        ref: 'Sci'
    },
    cp : {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    city_birthday: {
        type: String,
        required: true
    },
    np_part: {
        type: Number,
        required: true
    },
    percent_part: {
        type: Number,
        required: true
    }
});


AssocieSchema.pre('save', function(next) {
    // var sci = this;
    //
    // // only hash the password if it has been modified (or is new)
    // if (!user.isModified('password')) return next();
    //
    // // generate a salt
    // bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    //     if (err) return next(err);
    //
    //     // hash the password using our new salt
    //     bcrypt.hash(user.password, salt, function(err, hash) {
    //         if (err) return next(err);
    //
    //         // override the cleartext password with the hashed one
    //         user.password = hash;
    //         next();
    //     });
    // });
    next();
});

mongoose.model('Associe', AssocieSchema);
