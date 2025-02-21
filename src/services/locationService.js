import axios from 'axios'; // ESM 환경에서는 기본 경로 사용
import { kakaoApiKey, kakaoMapApiUrl } from '../config/kakaoConfig.js';

export const getLocationData = async (address) => {
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