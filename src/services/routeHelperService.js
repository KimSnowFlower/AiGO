import axios from 'axios';
import openApi from '../config/oepnAi.js';

/**
 * 출발지와 도착지를 기반으로 OpenAI를 통해 경로 안내 프롬프트를 생성하는 함수
 * @param {string} origin - 출발지
 * @param {string} destination - 도착지
 * @param {string} text - 추가 프롬프트 텍스트
 * @returns {string} - OpenAI가 생성한 안내 텍스트
 */
export const getRoute = async (origin, destination, text) => {
    // 입력값 검증
    if (!origin || !destination || !text) {
        throw new Error('출발지, 도착지 및 프롬프트 텍스트는 필수입니다.');
    }

    try {
        // OpenAI API 호출
        const response = await axios.post(
            'https://api.openai.com/v1/engines/davinci/completions',
            {
                prompt: `Provide detailed navigation directions for traveling from ${origin} to ${destination}. ${text}`,
                max_tokens: 150,
                temperature: 0.7,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0,
            },
            {
                headers: {
                    'Authorization': `Bearer ${openApi.OPEN_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        // 응답에서 텍스트 추출
        const aiResponse = response.data.choices?.[0]?.text?.trim();
        if (!aiResponse) {
            throw new Error('OpenAI 응답이 비어 있습니다.');
        }

        return aiResponse; // 경로 안내 텍스트 반환
    } catch (error) {
        console.error('OpenAI API 호출 중 오류 발생:', error.message);

        // 오류 메시지를 반환하거나, 적절한 예외 처리 수행
        throw new Error('경로 안내를 가져오는 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
};
