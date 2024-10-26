const mongoose = require('mongoose');

const {ObjectId} = mongoose.Schema

// const date = new Date()

const AppointmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a Name']
    },
    date: {
        type: Date,
        // type: Date.toDateString(),
        required: [true, 'Please add a date']
    },
    hourBegin: {
        type: String,
        required: [true, 'Please add a hour']
    },
    hourEnd: {
        type: String,
        required: [true, 'Please add a hour']
    },
    objective: {
        type: String,
        required: [true, 'Please add a objective']
    },
    email: {
        type: String,
        required: [true, 'Please add a objective']
    },
    phone: {
        type: String,
        required: [true, 'Please add a objective']
    },
    address: {
        type: String,
        // required: [true, 'Please add a objective']
    },
    status: {
        type: Boolean, 
        default: false
    },
    valid: {
        type: Boolean, 
        default: false
    },
    notApprouve: {
        type: Boolean, 
        default: false
    },
    serv:{
        type: ObjectId,
        required:true,
        ref:'Service'
    },
    user:{
        type: ObjectId,
        required:true,
        ref:'User'
    },
    client:{
        type: ObjectId,
        required:true,
        ref:'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },  
});

module.exports = mongoose.model('Appointment', AppointmentSchema);
