const express = require("express");
const router = express.Router();

const DriversController = require("controllers/drivers_controllers");
router.get("/", DriversController.greeting);
router.post("/drivers", DriversController.create);
module.exports = router;
