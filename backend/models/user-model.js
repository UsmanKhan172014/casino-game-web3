const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  secondName: { type: String, required: true },
  image: {
    data: Buffer,
    contentType: String,
  },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("user", userSchema);
