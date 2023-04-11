const mongoose = require('mongoose');
const { Schema } = mongoose;

const billSchema = new Schema({
    billID:{
        type: String,
        required: true,
        unique: true
    },
    billRoomNumber:{
        type: Number,
        required: true
    },
    billForResident:{
        type: String,
        required: true
    },
    billType:{
        type:String,
        required: true
    },
    billTotal:{
        type:Number,
        default:0
    },
    billDue:{
        type: Number,
        default: 0
    },
    billDate:{
        type: Date,
    },
    billStatus:{
        type: String,
    },
    waterBill:{
        type:Number,
    },
    electricityBill:{
        type:Number,
    },
    maintenanceBill:{
        type:Number,
    },
    wifiBill:{
        type:Number,
    },
});

module.exports = mongoose.model('bill',billSchema);