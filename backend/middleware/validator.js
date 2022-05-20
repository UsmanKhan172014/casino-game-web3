const { body, validationResult } = require("express-validator");

const express = require("express");
const app = express();

const privateKeyValidator = () => {
  return [
    body("privateKey").not().isEmpty().withMessage("Enter AlphaNumeric Value"),
  ];
};

const NameValidator=()=>{
  return [
    body('name').not().isEmpty().withMessage('Enter the AlphaNumeric Value for name')
  ]
}

const enterJackpotValidator = () => {
  return [
    body("privateKey").not().isEmpty().withMessage("Enter AlphaNumeric Value"),
    body("entryfee")
      .isNumeric({ gt: 0 })
      .withMessage("Enter Numeric Value greater than zero to enter Jackpot"),
  ];
};

const validateCheck = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
};

module.exports = {
  enterJackpotValidator,
  privateKeyValidator,
  validateCheck,
  NameValidator
};
