var bootstrap = require('../config/Bootstrap');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var Email = mongoose.SchemaTypes.Email;

var SciSchema = new Schema({
    id:{
        type: Number,
        index: {
            unique: true
        }
    },
    name: {
		type: String,
		required: true,
		index: {
			unique: true
		}
	},
    rcs: {
		type: Number,
		required: true
	},
    date_immatriculation: {
		type: Date,
		required: true
	},
    capital: {
		type: Number,
		required: true
	},
    naf: {
		type: String,
		required: true
	},
    adress: {
		type: String,
		required: true
	},
    cp: {
		type: Number,
		required: true
	},
    city: {
		type: String,
		required: true
	},
    nb_part: {
		type: Number,
		required: true
	},
    // associe:{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Associes'
    // }
});

function validate(next){
    var sci = this;
    console.log(sci);

    next();
}


SciSchema.pre('save', validate);

mongoose.model('Sci', SciSchema);
