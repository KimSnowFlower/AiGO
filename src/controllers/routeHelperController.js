const routeHelperService = require('../services/routeHelperService.js');

const routeHelper = async (req, res) => {
    try {
        const { origin, destination, text } = req.body;
        const route = await routeHelperService.getRoute(origin, destination, text);
        res.status(200).json(route);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { routeHelper };