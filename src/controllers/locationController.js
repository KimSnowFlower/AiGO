import { getLocationData } from '../services/locationService.js';

export const getLocation = async (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.status(400).send('주소를 제공해 주세요.');
  }
  try {
    const data = await getLocationData(address);
    res.json(data);
  } catch (error) {
    res.status(500).send('서버 오류');
  }
};