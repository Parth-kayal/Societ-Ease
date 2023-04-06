const mongoose = require('mongoose');
const { Schema } = mongoose;

const loginSchema = new Schema({
    userType:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required: true
    },
    userID:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('login',loginSchema);