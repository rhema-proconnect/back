const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema

const ContactSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, 'Please add a name']
    },
    email: {
      type: String,
      required: [true, 'Please add a description']
    },
    message:{
      type: String,
      require:true,
    },
  });

module.exports = mongoose.model('contact', ContactSchema);
