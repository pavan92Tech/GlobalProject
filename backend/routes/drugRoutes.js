const express = require("express");
const {
  registerDrug, getAllDrugs, getDrug, updateDrug, deleteDrug
} = require("../controllers/drugController");

const router = express.Router();

router.post("/", registerDrug);
router.get("/", getAllDrugs);
router.get("/:id", getDrug).put("/:id", updateDrug).delete("/:id", deleteDrug);

module.exports = router;
