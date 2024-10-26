const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema

const SuserSchema =  new mongoose.Schema({
	pdf: { type: String, required: true },
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

module.exports = mongoose.model("Suser", SuserSchema);
