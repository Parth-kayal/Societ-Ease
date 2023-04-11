const mongoose = require('mongoose');
const { Schema } = mongoose;

const complaintSchema = new Schema({
    complaintID:{
        type: String,
        required: true,
        unique: true
    },
    residentID:{
        type:String,
        required: true
    },
    complaintSubject:{
        type: String,
        required: true
    },
    complaintDescription:{
        type: String,
        required: true
    },
    complaintBy: {
        type: String,
        required: true
    },
    complaintStatus:{
        type: String,
        required: true
    },
    complaintPriority:{
        type: String,
        required: true
    },
},
{
    timestamps: true
});

module.exports = mongoose.model('complaint',complaintSchema);