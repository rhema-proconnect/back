const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema

const SelfWrokerSchema =  new mongoose.Schema({
	portefolio: { type: String },
	references: { type: String },
	register_number: { type: String},
	images: [String],
	valid: {
        type: Boolean, 
        default: false
    },
    notApprouve: { 
        type: Boolean, 
        default: false
    },
	user: {
		type: ObjectId,
        required:true,
        ref:'User'
	},
	createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("SelfWorker", SelfWrokerSchema);
