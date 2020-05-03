const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Create Schema
const BusinessSchema = new Schema({
  requestId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  message: {
    type: String,
    required: true,
  },
});

module.exports = Business = mongoose.model("business", BusinessSchema);
