const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema

const StudentSchema =  new mongoose.Schema({
	email: { type: String, required: true },
	pdf1: { type: String, required: true },
	pdf2: { type: String, required: true },
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

module.exports = mongoose.model("Student", StudentSchema);