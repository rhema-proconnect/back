const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema

const CompanySchema =  new mongoose.Schema({
	name: { type: String, required: true },
	username: { type: String, required: true },
	email: { type: String, required: true },
	address: { type: String, required: true },
	phone: { type: String, required: true },
	industry: { type: String, required: true },
	certi: { type: String, required: true },
	description: { type: String, required: true },
	employee: { type: String, required: true },
	website: { type: String, required: true },
	facebook: { type: String, required: true },
	tikTok: { type: String, required: true },
	insta: { type: String, required: true },
	twitter: { type: String, required: true },
	product: { type: String, required: true },
	mapp: { type: String, required: true },
	objectives: { type: String, required: true },
	message: { type: String, required: true },
	isApprouve:{ 
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

module.exports = mongoose.model("company", CompanySchema);
