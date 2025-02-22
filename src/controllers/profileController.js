import { getProfile } from '../services/profileService.js';

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const profile = await getProfile(userId);
        res.status(201).json(profile);
    } catch (error) {
        res.status(500).json({ error: 'Profile retrieval failed', details: error.message });
    }
};