const express = require("express");
const {
  registerContract, getAllContracts, getContract
} = require("../controllers/contractController");

const router = express.Router();

router.post("/", registerContract);
router.get("/", getAllContracts);
router.get("/:id", getContract);

module.exports = router;
