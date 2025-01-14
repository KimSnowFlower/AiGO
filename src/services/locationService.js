const axios = require('axios');
const { kakaoApiKey, kakaoMapApiUrl } = require('../config/kakaoConfig');

exports.getLocationData = async (address) => {
  try {
    const response = await axios.get(kakaoMapApiUrl, {
      params: { query: address },
      headers: {
        Authorization: `KakaoAK ${kakaoApiKey}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data from Kakao API:', error);
    throw error;
  }
};