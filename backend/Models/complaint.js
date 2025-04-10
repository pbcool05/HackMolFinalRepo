const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const complaintSchema = new Schema({
    typeOfComplaint: {
        type: String,
        required: true,
        enum: ['Late Train', 'Poor Service', 'Cleanliness', 'Safety Issue', 'Other']  // Dropdown options
    },
    description: {
        type: String,
        required: true
    },
    trainNumber: {
        type: Number,
        required: true
    },
    ticketNumber: {
        type: Number,
        required: true
    },
    inquiryDate: {
        type: Date,
        default: Date.now
    },
    uploadedImage: {
        type: String,
        validate: {
            validator: function(value) {
                // Validate if it's a valid base64 image string for common formats
                return !value || value.match(/^data:image\/(jpeg|jpg|png|gif|webp);base64,/);
            },
            message: 'Invalid image format. Must be a base64 image (JPEG, JPG, PNG, GIF, or WebP).'
        },
        required: false
    },
    priority:{
        type : Number,
        default: null
    }
});

const ComplaintModel = mongoose.model('Complaints', complaintSchema);
module.exports = ComplaintModel;
