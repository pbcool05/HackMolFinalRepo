const Joi = require('joi');

// Joi validation schema
const complaintValidationSchema = Joi.object({
    typeOfComplaint: Joi.string().valid('Late Train', 'Poor Service', 'Cleanliness', 'Safety Issue', 'Other').required(),
    description: Joi.string().required(),
    trainNumber: Joi.number().required(),
    ticketNumber: Joi.number().required(),
    inquiryDate: Joi.date().optional(),
    uploadedImage: Joi.string()
        .pattern(/^data:image\/(jpeg|jpg|png|gif|webp);base64,/)
        .allow(null, '')
        .optional()
});

// Complaint validation middleware
const complaintValidation = (req, res, next) => {
    const { error } = complaintValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: "Validation error", error: error.details[0].message });
    }
    next();
};

module.exports = {
    complaintValidation
};
