const mongoose = require('mongoose');
const { Schema } = mongoose;

const memberSchema = new Schema({
    memberID:{
        type: String,
        required: true,
        unique: true
    },
    memberName:{
        type:String,
        required: true
    },
    memberRelation:{
        type: String,
        required: true
    },
    memberAadhar:{
        type: String,
        required: true
    },
    memberDOB:{
        type: Date,
        required: true
    },
    memberRoomNumber:{
        type: Number,
        required: true
    },
});

module.exports = mongoose.model('member',memberSchema);