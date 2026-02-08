const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt); // [cite: 28]

        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "User registered" });
    } catch (err) {
        res.status(400).json({ message: "Registration failed" }); // [cite: 32]
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};