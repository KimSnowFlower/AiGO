const axios = require('axios/dist/node/axios.cjs');
const { kakaoApiKey, kakaoMapApiUrl } = require('../config/kakaoConfig');

const getLocationData = async (address) => {
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

module.exports = { getLocationData };