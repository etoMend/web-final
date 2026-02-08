const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth'); // Fixed to match your filename
const User = require('../models/User');

router.get('/profile', auth, async (req, res) => {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
});

router.put('/profile', auth, async (req, res) => {
    const { username, email } = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, { username, email }, { new: true });
    res.json(user);
});

module.exports = router;