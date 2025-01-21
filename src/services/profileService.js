import db from '../config/database';

export const getProfile = async (userId) => {
    try{
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [userId]);

        if(rows.length === 0) {
            throw new Error('User not found');
        }

        return rows[0];
    } catch(error) {
        throw new Error('Profile retrieval failed');
    }
};