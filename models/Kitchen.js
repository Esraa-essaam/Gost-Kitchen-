const mongoose = require("mongoose");

const kitchenSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    pricePerHour: {
        type: Number,
        required: true
    },
    
    amenities: [{ type: String }], 

    isAvailable: {
        type: Boolean,
        default: true
    },
    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true 
    }
}, { timestamps: true });

module.exports = mongoose.model("Kitchen", kitchenSchema);