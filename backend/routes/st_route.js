const express = require("express");
const controller = require("../controllers/st_controller");
const router = express.Router();

router.get("/st/collections", controller.getStCollections);
router.get("/st/markers", controller.getStMarkers);
router.get("/st/routes", controller.getStRoutes);

module.exports = router;
// router.get("/hl");
