const express = require("express");
const controller = require("../controllers/global_controller");
const router = express.Router();

router.get("/all_global_points", controller.getAllGlobalPoints);
router.get("/st_routes", controller.getStRoutes);
router.get("/stl_routes", controller.getStlRoutes);
router.get("/global_routes", controller.getGlobalRoutes);

module.exports = router;
