const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema

const StudentSchema =  new mongoose.Schema({
	fullName: { type: String, required: true },
	// email: { type: String, required: true },
	phone: { type: String, required: true },
	portfolio: { type: String, required: true },
	cat: { type: String, required: true },
	experience: { type: String, required: true },
	descriptionPersonnel: { type: String, required: true },
	image:{type: String, require:true,},
	facebook:{type: String, require:true,},
	insta:{type: String, require:true,},
	tiktok:{type: String, require:true,},
	valid: {type: Boolean, default: false},
    notApprouve: {type: Boolean, default: false},
	user: {type: ObjectId,required:true,ref:'User'},
	createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("StudentM", StudentSchema);