const validator = require("./../middleware/validator");
const { ethers } = require("ethers");
const HttpError = require("./../util/http-error");
const jackpot= require('../models/jackpot')
const INFURA_ID = "dde0b6c9c66049ae9edda38ce236e1da";
const provider = new ethers.providers.JsonRpcProvider(
  `https://rinkeby.infura.io/v3/${INFURA_ID}`
);

// const Jackpot_ABI = [
//   "function enter(address token, uint amountToPay) public payable",
//   "function transferERC20(address token) public",
// ];

const Jackpot_ABI = require('../abi/jackpot.json');

// const ERC20_ABI = [
//   "function transfer(address to, uint256 amount) public virtual override returns (bool)",
//   "function balanceOf(address account) public view virtual override returns (uint256)",
//   "function mint(address to, uint256 amount) public",
//   "function approve(address spender, uint256 amount) public virtual override returns (bool)",
// ];
const ERC20_ABI=require('../abi/tokens.json');

const jackpotAddress = "0x86Fe2510524De24BcF6898a37A5124981D994948";
const tokenAddress = "0x2c9f3d54882c7b6aa9A8F09518dFCaE6a46a2A19";

const enterUser = async (req, res, next) => {
  if (validator.validateCheck(req, res)) {
    return;
  }

  const { privateKey, entryfee } = req.body;

  let contract;
  let wallet;
  let tokenContract;

  try {
    contract = new ethers.Contract(jackpotAddress, Jackpot_ABI, provider);
    // tokenContract = new ethers.Contract(tokenAddress, ERC_ABI, provider);
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
    // const contractTokenWithWallet = tokenContract.connect(wallet);
    // tx = await contractTokenWithWallet.approve(jackpotAddress, entryfee);
    tx = await contractWithWallet.enter(tokenAddress, entryfee);
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

const awardWinner = async (req, res, next) => {
  if (validator.validateCheck(req, res)) {
    return;
  }

  const { privateKey } = req.body;
  let contract;
  let wallet;

  try {
    contract = new ethers.Contract(jackpotAddress, Jackpot_ABI, provider);
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

    tx = await contractWithWallet.transferERC20(tokenAddress);

    await tx.wait();
  } catch (err) {
    const error = new HttpError(
      "Failed to get winner, please try again later." + err,
      500
    );
    return next(error);
  }

  res.status(200).send(tx);
};
const createJackpot = async (req, res, next) => {
  if (validator.validateCheck(req, res)) {
    return;
  }

  const { name } = req.body;

  let refJackpot;
  try {
    refJackpot = await jackpot.findOne({ name: name });
  } catch (err) {
    return res.status(500).send("Could not jackpot, Please try again");
  }

  if (refJackpot) res.status(400).send("Jackpot already exists");

  const newJackpot = new jackpot({
    name: name,
  });

  try {
    await newJackpot.save();
  } catch (err) {
    return res.status(500).send(err);
  }

  res.status(400).send("Jackpot created!");
};

module.exports = { awardWinner, enterUser,createJackpot };