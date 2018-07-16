const express = require("express");
const router = express.Router();

const DriversController = require("controllers/drivers_controllers");
router.get("/", DriversController.greeting);
router.post("/drivers", DriversController.create);
router.put("/drivers/:id", DriversController.edit);
router.delete("/drivers/:id", DriversController.delete);
module.exports = router;
