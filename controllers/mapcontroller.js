const mapService = require("../services/map.services");

/**
 * GET /api/map/list
 */
exports.getMapList = async (req, res) => {
  try {
    const data = await mapService.getMapList();
    res.json(data);
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
};

/**
 * GET /api/map/grid/:map
 */
exports.getMapGrid = async (req, res) => {
  try {
    const map_name = req.params.map
    const data = await mapService.getMapGrid(map_name)
    res.json(data);
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
};

/**
 * GET /api/map/stations/:map
 */
exports.getStations = async (req, res) => {
  try {
    const data = await mapService.send(19206, 3050, {
      map_name: req.params.map,
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
};

exports.pullMap = async (req, res) => {
  try {
    const { map_name } = req.body;

    if (!map_name) {
      return res.status(400).json({ error: "map_name required" });
    }

    const data = await mapService.pullMap(map_name);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};