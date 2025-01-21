import axios from 'axios';
import kakaoConfig from '../config/kakaoConfig.js';

export const getKakaoToken = async (code) => {
    const url = 'https://kauth.kakao.com/oauth/token';

    const params = {
        grant_type: 'authorization_code',
        client_id: kakaoConfig.clientID,
        redirect_uri: kakaoConfig.redirectURI,
        code,
    };

    try {
        const response = await axios.post(url, null, { params });
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching Kakao token:', error.response.data);
        throw new Error('Failed to get Kakao token');
    }
};

export const getKakaoUserInfo = async (accessToken) => {
    const url = 'https://kapi.kakao.com/v2/user/me';

    try {
        const response = await axios.get(url, {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching Kakao user info:', error.response.data);
        throw new Error('Failed to get Kakao user info');
    }
};
