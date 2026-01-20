const navigationService = require("../services/navigation.service");

exports.pauseNavigation = async (req, res) => {
  try {
    const result = await navigationService.pause();
    return res.json({ success: true, result });
  } catch (err) {
    console.error("Pause error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.resumeNavigation = async (req, res) => {
  try {
    const result = await navigationService.resume();
    return res.json({ success: true, result });
  } catch (err) {
    console.error("Resume error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.cancelNavigation = async (req, res) => {
  try {
    const result = await navigationService.cancel();
    return res.json({ success: true, result });
  } catch (err) {
    console.error("Cancel error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
