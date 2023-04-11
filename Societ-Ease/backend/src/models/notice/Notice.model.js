const mongoose = require('mongoose');
const { Schema } = mongoose;

const noticeSchema = new Schema({
    noticeID:{
        type: String,
        required: true,
        unique: true
    },
    noticeSubject:{
        type: String,
        required: true
    },
    noticeDescription:{
        type: String,
        required: true
    },
},
{
    timestamps:true
}
);

module.exports = mongoose.model('notice',noticeSchema);