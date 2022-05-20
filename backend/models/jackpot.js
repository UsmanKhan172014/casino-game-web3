const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const jackpotSchema = new Schema({
  name: { type: String, required: true, unique: true },
  paricipants: [
    {
      id: { type: String },
      entryfee: { type: Number },
    },
  ],
  maxFee: {
    id: { type: String },
    entryfee: { type: Number },
  },
  secondMaxFee: { id: { type: String }, entryfee: { type: Number } },
});

jackpotSchema.plugin(uniqueValidator);

module.exports = mongoose.model("jackpot", jackpotSchema);
