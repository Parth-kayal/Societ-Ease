const mongoose = require('mongoose');
const { Schema } = mongoose;

const residentSchema = new Schema({
    residentID:{
        type: String,
        required: true,
        unique: true
    },
    residentName:{
        type:String,
        required: true
    },
    residentContactNumber:{
        type: String,
        required: true
    },
    residentEmail:{
        type: String,
        required: true
    },
    residentAadhar:{
        type: String,
        required: true
    },
    residentRoomNumber:{
        type: Number,
        required: true
    },
    residentShiftDate: {
        type: Date,
    },
    familyMembers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'member'
        }
    ],
    securityKey:{
        type: String,
        required: true
    }, 
    status:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('resident',residentSchema);