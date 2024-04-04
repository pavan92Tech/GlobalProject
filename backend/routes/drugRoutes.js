const express = require("express");
const {
  registerDrug, getAllDrugs, getDrug, updateDrug, deleteDrug
} = require("../controllers/drugController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.use(validateToken);

router.post("/", registerDrug);
router.get("/", getAllDrugs);
router.get("/:id", getDrug).put("/:id", updateDrug).delete("/:id", deleteDrug);

module.exports = router;
