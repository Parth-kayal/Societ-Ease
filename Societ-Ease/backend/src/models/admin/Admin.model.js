const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminSchema = new Schema({
    adminID:{
        type: String,
        required: true,
        unique: true
    },
    adminName:{
        type:String,
        required: true
    },
    adminAadhar:{
        type: String,
        required: true
    },
    adminContactNumber:{
        type: String,
        required: true
    },
    adminEmail:{
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('admin',adminSchema);