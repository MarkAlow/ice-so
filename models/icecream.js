const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Create Schema
const IceCreamSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  }
});

module.exports = IceCream = mongoose.model("icecream", IceCreamSchema);
