import axios from 'axios';
import { OPEN_API_KEY } from '../config/openAi.js'; // openApi 객체 대신 직접 import

export const getRoute = async (origin, destination, text) => {
    if (!origin || !destination || !text) {
        throw new Error('출발지, 도착지 및 프롬프트 텍스트는 필수입니다.');
    }
    try {
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
                    'Authorization': `Bearer ${OPEN_API_KEY}`,
                    'Content-Type': 'application/json',
                },
            }
        );
        const aiResponse = response.data.choices?.[0]?.text?.trim();
        if (!aiResponse) {
            throw new Error('OpenAI 응답이 비어 있습니다.');
        }
        return aiResponse;
    } catch (error) {
        console.error('OpenAI API 호출 중 오류 발생:', error.message);
        throw new Error('경로 안내를 가져오는 중 문제가 발생했습니다. 다시 시도해주세요.');
    }
};