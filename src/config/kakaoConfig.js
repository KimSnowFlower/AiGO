require('dotenv').config({ path: '../.env' });

/*
const KAKAO_CLIENT_ID = 'your_kakao_client_id';
const REDIRECT_URI = 'http://localhost:3000/auth/kakao/callback';

const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

console.log(KAKAO_AUTH_URL); // 버튼 클릭 시 이 URL로 리디렉션
*/

module.exports = {
    kakaoApiKey: process.env.KAKAO_CLIENT_ID,
    redirectURL: process.env.KAKAO_REDIRECT_URL,
    kakaoMapApiUrl: process.env.KAKAO_MAP_API_URL,
};