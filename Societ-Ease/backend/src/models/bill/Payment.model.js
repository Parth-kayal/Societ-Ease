const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentSchema = new Schema({
    paymentID:{
        type: String,
        required: true,
        unique: true
    },
    paymentAmount:{
        type: Number,
        required: true
    },
    paidBy:{
        type: String,
        required: true
    },
    billType: {
        type:String,
        required: true
    },
    paymentDate: {
        type: Date,
        // required: true
    },
    paymentStatus:{
        type: String,
        required: true
    },
});

module.exports = mongoose.model('payment',paymentSchema);