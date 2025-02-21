const profileService = require('../services/profileService.js');

const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const profile = await profileService.getProfile(userId);
        res.status(201).json(profile);
    } catch (error) {
        res.status(500).json({ error: 'Profile retrieval failed', details: error.message });
    }
};

module.exports = { getProfile };