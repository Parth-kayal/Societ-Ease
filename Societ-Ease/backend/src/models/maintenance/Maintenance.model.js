const mongoose = require('mongoose');
const { Schema } = mongoose;

const maintenanceSchema = new Schema({
    maintenanceID:{
        type: String,
        required: true,
        unique: true
    },
    maintenanceSubject:{
        type: String,
        required: true
    },
    maintenanceDescription:{
        type: String,
        required: true
    },
    maintenanceBudget: {
        type: Number,
        required: true
    },
    maintenanceStatus:{
        type: String,
        required: true
    },
    maintenancePriority:{
        type: String,
        required: true
    },
    maintenanceDate:{
        type: Date,
    },
},
{
    timestamps:true
}
);

module.exports = mongoose.model('maintenance',maintenanceSchema);