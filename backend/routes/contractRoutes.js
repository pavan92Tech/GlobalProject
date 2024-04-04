const express = require("express");
const {
  registerContract, getAllContracts, getContract, updateContract, deleteContract
} = require("../controllers/contractController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.use(validateToken);
router.post("/", registerContract);
router.get("/", getAllContracts);
router.get("/:id", getContract).put("/:id", updateContract).delete("/:id", deleteContract);

module.exports = router;
