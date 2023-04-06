const mongoose = require('mongoose');
const { Schema } = mongoose;

const guestSchema = new Schema({
    guestID:{
        type: String,
        required: true,
        unique: true
    },
    guestName:{
        type: String,
        required: true
    },
    guestContactNumber:{
        type: String,
        required: true
    },
    guestAadhar: {
        type: String,
        required: true
    },
    guestPurpose:{
        type: String,
        required: true
    },
    guestVisitTime:{
        type: Date,
        required: true
    },
    guestLeavingTime:{
        type: Date,
        required: true
    },
});

module.exports = mongoose.model('guest',guestSchema);