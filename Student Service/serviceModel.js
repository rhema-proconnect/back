const mongoose = require('mongoose');

const {ObjectId} = mongoose.Schema

const ServiceSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please add a name']
    },
    pag:{
      type: ObjectId,
      required:true,
      ref:'page'
    },
    user:{
      type: ObjectId,
      required:true,
      ref:'User'
    },
    description: {
      type: String,
      required: [true, 'Please add a description']
    },
    hourBegin1: {
      type: String,
      required: [true, 'Please add a hourBegin1']
    },
    hourEnd1: {
      type: String,
      required: [true, 'Please add a hourEnd1']
    },
    hourBegin2: {
      type: String,
      required: [true, 'Please add a hourBegin2']
    },
    hourEnd2: {
      type: String,
      required: [true, 'Please add a hourEnd2']
    },
    image:{
      type: String,
      require:true,
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
  
  });

module.exports = mongoose.model('Service', ServiceSchema);
