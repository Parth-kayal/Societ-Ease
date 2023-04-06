const mongoose = require('mongoose');
const { Schema } = mongoose;

const adminNotifSchema = new Schema({
    notifID:{
        type: String,
        required: true,
        unique: true
    },
    notifType:{
        type:String,
        required: true
    },
    notifName:{
        type: String,
        required: true
    },
    notifDescription:{
        type: String,
        required: true
    },
    notifDate:{
        type: Date,
        required: true
    },
    readStatus:{
        type: String,
        required: true
    },
    maintenanceID:{
        type:String
    },
    complaintID:{
        type: String
    },
    securityKey:{
        type: String
    },
    noticeID:{
        type: String
    },
    guestID:{
        type: String
    },
    billID:{
        type: String
    }
});

module.exports = mongoose.model('adminNotif',adminNotifSchema);