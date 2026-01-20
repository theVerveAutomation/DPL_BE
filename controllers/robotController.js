const robotService = require('../services/robotService');

async function postMove(req, res) {
  try {
    const { vx, vy, w, duration } = req.body;
    const r = await robotService.moveOpenLoop({ vx, vy, w, duration });
    return res.json({ ok: true, result: r });
  } catch (err) {
    console.error("postMove error", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
}

async function postStop(req, res) {
  try {
    const r = await robotService.stopMotion();
    return res.json({ ok: true, result: r });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
}

async function getBattery(req, res) {
  try {
    const r = await robotService.getBattery(true);
    return res.json({ ok: true, result: r });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
}

async function getLocation(req, res) {
  try {
    const r = await robotService.getLocation();
    return res.json({ ok: true, result: r });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
}

async function getNavStatus(req, res) {
  try {
    const r = await robotService.getNavStatus(true);
    return res.json({ ok: true, result: r });
  } catch (err) {
    return res.status(500).json({ ok: false, error: err.message });
  }
}

async function RunTask(req, res) {
  try {
    const { name } = req.body; // destructuring 'name' directly
    const r = await robotService.RunTask({ name: name });
    return res.json({ ok: true, result: r });
  } catch (err) {
    console.error("RunTask error", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
}

async function Estop(req, res) {
  try {
    const { status } = req.body;   // 👈 extract directly

    console.log("E-Stop Request Body:", status);

    const result = await robotService.Estop(status);

    return res.json({ ok: true, result });

  } catch (err) {
    console.error("Estop controller error", err);
    return res.status(500).json({ ok: false, error: err.message });
  }
}

async function seizeControl(req, res) {
  try {
    const result = await robotService.seizeControl();

    res.status(200).json({
      success: true,
      message: "Robot control seized successfully",
      data: result
    });
  } catch (error) {
    console.error("Seize Control Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to seize robot control",
      error: error.message
    });
  }
};

/* ===============================
   RELOCATE
================================ */
async function relocate(req, res){
  try {
    const { x, y, angle } = req.body;

    if (x === undefined || y === undefined || angle === undefined) {
      return res.status(400).json({
        success: false,
        message: "x, y, angle are required"
      });
    }

    const result = await robotService.relocate({ x, y, angle });

    res.status(200).json({
      success: true,
      message: "Relocation command sent",
      data: result
    });
  } catch (error) {
    console.error("Relocate Error:", error);

    res.status(500).json({
      success: false,
      message: "Relocation failed",
      error: error.message
    });
  }
};

/* ===============================
   CONFIRM LOCATION
================================ */
async function confirmLocation(req,res){
  try {
    const result = await robotService.confirmLocation();

    res.status(200).json({
      success: true,
      message: "Location confirmed",
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Confirm location failed",
      error: error.message
    });
  }
};


module.exports = { postMove, postStop, getBattery, getLocation, getNavStatus, RunTask, Estop, seizeControl,relocate,confirmLocation };