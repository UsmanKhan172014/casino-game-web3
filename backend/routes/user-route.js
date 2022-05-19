const express = require("express");
const userController = require("../controllers/user-controller");
const validator = require("./../middleware/validator");
const multer = require("./../middleware/multer");

const router = express.Router();

router.post(
  "/register",
  multer.upload.single("image"),
  userController.registerUser
);

module.exports = router;
