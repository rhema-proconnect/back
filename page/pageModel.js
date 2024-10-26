const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const PageSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please add a name']
    },
    description: {
      type: String,
      required: [true, 'Please add a description']
    },
    image:{
      type: String,
      require:true,
    },
    serviceNumber:{
      type: String,
      require:true,
    },
    phoneNumber:{
      type: String,
      require:true,
    },
    cat:{
      type: String,
      require:true,
    },
	  isApprouve:{ 
      type: Boolean, 
      default: false 
    },
    user:{
      type: ObjectId,
      required:true,
      ref:'User',
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
  });

module.exports = mongoose.model('page', PageSchema);
