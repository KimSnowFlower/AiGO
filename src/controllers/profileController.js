import profileService from '../services/profileService.js';

export const getProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const profile = await profileService.getProfile(userId);

        res.status(201).json(profile);
    } catch (error) {
        res.status(500).json({ error: 'Profile retrieval failed', details: error.message });
    }
};