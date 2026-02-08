const Joi = require('joi');

const validateApartment = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(100).required(),
        description: Joi.string().min(10).required(),
        price: Joi.number().positive().required(),
        type: Joi.string().valid('rent', 'sell').required()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    next();
};

module.exports = { validateApartment };