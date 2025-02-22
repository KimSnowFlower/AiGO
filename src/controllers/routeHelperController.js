import { getRoute } from '../services/routeHelperService.js';

export const routeHelper = async (req, res) => {
    try {
        const { origin, destination, text } = req.body;
        const route = await getRoute(origin, destination, text);
        res.status(200).json(route);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};