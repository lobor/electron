var bootstrap = require('../config/Bootstrap');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var AssocieSchema = new Schema({
    id:{
        type: Number,
        index: {
            unique: true
        }
    },
    email: {
		type: String,
		required: true,
		index: {
			unique: true
		}
	},
    password: {
		type: String,
		required: true
	},
    role: {
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
});

mongoose.model('Associe', AssocieSchema);
