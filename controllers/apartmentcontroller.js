// controllers/apartmentController.js
const Apartment = require('../models/apartment');

// @desc    Create a new resource [cite: 21]
exports.createApartment = async (req, res) => {
    try {
        const apartment = new Apartment({ 
            ...req.body, 
            owner: req.user.id 
        });
        await apartment.save();
        res.status(201).json(apartment);
    } catch (err) {
        res.status(400).json({ message: "Validation Error", error: err.message });
    }
};

// @desc    Get all user resources [cite: 22]
exports.getApartments = async (req, res) => {
    try {
        const apartments = await Apartment.find();
        res.json(apartments);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Get a specific resource [cite: 22]
exports.getApartmentById = async (req, res) => {
    try {
        const apartment = await Apartment.findById(req.params.id);
        if (!apartment) return res.status(404).json({ message: "Not found" });
        res.json(apartment);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};

// @desc    Update a resource [cite: 22]
exports.updateApartment = async (req, res) => {
    try {
        const apartment = await Apartment.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        res.json(apartment);
    } catch (err) {
        res.status(400).json({ message: "Update failed" });
    }
};

// @desc    Delete a resource [cite: 22]
exports.deleteApartment = async (req, res) => {
    try {
        await Apartment.findByIdAndDelete(req.params.id);
        res.json({ message: "Apartment deleted" });
    } catch (err) {
        res.status(500).json({ message: "Delete failed" });
    }
};