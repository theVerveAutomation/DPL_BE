const robotStatusService = require("../services/robotErrorService");

exports.getBlockedStatus = async (req, res) => {
  try {
    const data = await robotStatusService.fetchBlockedStatus();

    res.json({
      success: true,
      api: 1006,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to get blocked status",
      error: error.message
    });
  }
};
