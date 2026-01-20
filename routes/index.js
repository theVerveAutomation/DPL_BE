const express = require('express');
const router = express.Router();
const robotCtrl = require('../controllers/robotController');
const taskCtrl = require('../controllers/taskController');
const robotStatusController = require("../controllers/robotErrorController");
const navigationController = require("../controllers/robotNaviController");

// Robot endpoints
router.post('/move', robotCtrl.postMove);
router.post('/stop', robotCtrl.postStop);
router.post('/Estop', robotCtrl.Estop);
router.get('/status/battery', robotCtrl.getBattery);
router.post('/seize-control', robotCtrl.seizeControl);
router.get('/status/location', robotCtrl.getLocation);
router.get('/status/nav', robotCtrl.getNavStatus);
router.post('/navi/run-task', robotCtrl.RunTask);

router.get("/status/blocked", robotStatusController.getBlockedStatus);

router.post("/relocate", robotCtrl.relocate);
router.post("/confirm-location", robotCtrl.confirmLocation);

// Navigation endpoints
router.post("/pause", navigationController.pauseNavigation);
router.post("/resume", navigationController.resumeNavigation);
router.post("/cancel", navigationController.cancelNavigation);

// // Task endpoints
// router.post('/tasks', taskCtrl.createTask);
// router.get('/tasks', taskCtrl.listTasks);

module.exports = router;
