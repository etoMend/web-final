const mongoose = require('mongoose');

const ApartmentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    type: { type: String, enum: ['rent', 'sell'], required: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Apartment', ApartmentSchema);