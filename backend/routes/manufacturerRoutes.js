const express = require("express");
const {
  registerManufacturer, getAllManufacturers, getManufacturer, updateManufacturer, deleteManufacturer
} = require("../controllers/manufacturerController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.use(validateToken);

router.post("/", registerManufacturer);
router.get("/", getAllManufacturers);
router.get("/:id", getManufacturer).put("/:id", updateManufacturer).delete("/:id", deleteManufacturer);

module.exports = router;
