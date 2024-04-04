const express = require("express");
const {
  registerUser,
  currentUser,
  loginUser,
  getAllUsers
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, currentUser);
router.get("/", validateToken, getAllUsers);

module.exports = router;