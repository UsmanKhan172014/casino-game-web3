const express = require("express");
const jackpotController = require("../controllers/jackpot-controller");
const validator = require("./../middleware/validator");

const router = express.Router();

router.post(
  "/enter",
  validator.enterJackpotValidator(),
  jackpotController.enterUser
);

router.post(
  "/awardwinner",
  validator.privateKeyValidator(),
  jackpotController.awardWinner
);

module.exports = router;
