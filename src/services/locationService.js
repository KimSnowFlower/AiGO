import axios from 'axios';
import { kakaoApiKey, kakaoMapApiUrl } from '../config/kakaoConfig';

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