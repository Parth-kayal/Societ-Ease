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
    guestEmail:{
        type: String,
        required: true
    },
    guestContactNumber:{
        type: String,
        required: true
    },
    guestRoomNumber:{
        type: String,
        required: true
    },
    visitPurpose:{
        type: String,
        required: true
    },
    guestVisitDate:{
        type: Date,
    },
    guestLeavingTime:{
        type: Date,
    },
});

module.exports = mongoose.model('guest',guestSchema);