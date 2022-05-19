const nft = require("../models/nft-model");
const validator = require("./../middleware/validator");
const { ethers } = require("ethers");
const HttpError = require("./../util/http-error");
const pinataSDK = require("@pinata/sdk");
const pinata = pinataSDK(
  "e329bad53a35269c6b1c",
  "c4a3377fdf29b02bb9a00e2895faf4818a3f943ffb16c47d71796f838ad3d164"
);
const fs = require("fs");
require("dotenv/config");

const uploadNft = async (req, res, next) => {
  const { description, name } = req.body;

  const newNft = new nft({
    description: description,
    name: name,
    image: {
      data: req.file.filename,
      contentType: "image/jpeg",
    },
  });

  try {
    await newNft.save();
  } catch (err) {
    return res.status(500).send("Could not upload, Please try again");
  }

  const file = fs.createReadStream(`./../uploads/${req.file.filename}`);

  try {
    await newNft.save();
  } catch (err) {
    return res.status(500).send("Could not upload, Please try again");
  }

  const options = {
    pinataMetadata: {
      name: "Generic Gametrain NFT",
      keyvalues: {
        customKey: "nothing special",
        customKey2: "just Gametrain",
      },
    },
    pinataOptions: {
      cidVersion: 0,
    },
  };

  try {
    const check = await pinata.testAuthentication();
    console.log(check);
  } catch (error) {
    console.error(error);
  }

  let imageHash;
  try {
    imageHash = await pinata.pinFileToIPFS(file, options);
    console.log(imageHash);
  } catch (error) {
    console.error(error);
  }

  const imageLink = "https://gateway.pinata.cloud/ipfs/" + imageHash.IpfsHash;

  const metaData = {
    description: description,
    external_url: "",
    image: imageLink,
    name: name,
    attributes: [{ rarity: "veryrare" }],
  };

  try {
    const json = await pinata.pinJSONToIPFS(metaData, options);
    console.log(json);
  } catch (error) {
    console.error(error);
  }

  res.status(200).send("nft Uploaded!");
};

module.exports = { uploadNft };
