const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const nftSchema = new Schema({
  description: { type: String, required: true },
  external_url: { type: String },
  image: { type: String },
  name: { type: String, required: true },
  attributes: [{ type: String }],
  image: {
    data: Buffer,
    contentType: String,
  },
});

nftSchema.plugin(uniqueValidator);

module.exports = mongoose.model("nft", nftSchema);
