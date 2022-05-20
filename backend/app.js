const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("dotenv/config");

const user = require("./routes/user-route");
const nft = require("./routes/nft-route");
const jackpot = require("./routes/jackpot-route");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/user", user);
app.use("/nft", nft);
app.use("/jackpot", jackpot);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT,()=>{});
    console.log('Server is running at PORT : '+process.env.PORT)
  })
  .catch((err) => {
    console.log(err);
  });
