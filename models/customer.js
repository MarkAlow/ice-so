const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Create Schema
const CustomerSchema = new Schema({
  orderId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  date: {
    type: String,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  closed: {
    type: Boolean,
    required: true,
  },
  wrongAddress: {
    type: Boolean,
    required: true,
  },
  noPayment: {
    type: Boolean,
    required: true,
  },
  otherReport: {
    type: Boolean,
    required: true,
  },
  iceCreams: {
    type: Object,
    required: true,
  },
});

module.exports = Customer = mongoose.model("customer", CustomerSchema);
