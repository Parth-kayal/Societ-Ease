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
    billDue:{
        type: Number,
        required: true
    },
    billDate:{
        type: Date,
        required: true
    },
    billAmount:{
        type: Number,
        required: true
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