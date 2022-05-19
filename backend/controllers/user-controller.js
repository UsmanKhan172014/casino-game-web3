const user = require("../models/user-model");
const validator = require("./../middleware/validator");
const { ethers } = require("ethers");
const HttpError = require("./../util/http-error");

const registerUser = async (req, res, next) => {
  // if (validator.validateCheck(req, res)) {
  //   return;
  // }

  const { firstName, secondName } = req.body;

  const newUser = new user({
    firstName,
    secondName,
    image: {
      data: req.file.filename,
      contentType: "image/jpeg",
    },
  });

  try {
    await newUser.save();
  } catch (err) {
    return res.status(500).send("Could not register user, Please try again");
  }

  res.status(200).send("user registered!");
};

const transferToken = async (req, res, next) => {
  if (validator.validateCheck(req, res)) {
    return;
  }

  const { privateKey, to, amount } = req.body;

  let contract;
  let wallet;

  try {
    contract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
    wallet = new ethers.Wallet(privateKey, provider);
  } catch (err) {
    const error = new HttpError(
      "Failed to connect to wallet, please try again later." + err,
      500
    );
    return next(error);
  }
  let tx;
  try {
    const contractWithWallet = contract.connect(wallet);

    tx = await contractWithWallet.transfer(to, amount);

    await tx.wait();
  } catch (err) {
    const error = new HttpError(
      "Failed to enter jackpot, please try again later." + err,
      500
    );
    return next(error);
  }

  res.status(200).send(tx);
};

module.exports = { registerUser };
