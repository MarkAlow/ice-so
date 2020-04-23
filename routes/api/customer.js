const express = require("express");
const router = express.Router();

// Item Model

const Customer = require("../../models/customer");

// @route GET api/customer
// @desc Get All customers
// @access Public
router.get("/", (req, res) => {
  Customer.find()
    .sort({ name: -1 })
    .then((items) => res.json(items));
});

// @route POST api/customer
// @desc Create a Customer
// @access Public
router.post("/", (req, res) => {
  const newCustomer = new Customer({
    orderId: req.body.orderId,
    name: req.body.name,
    phone: req.body.phone,
    address: req.body.address,
    date: req.body.date,
    lat: req.body.lat,
    lng: req.body.lng,
    closed: req.body.closed,
    wrongAddress: req.body.wrongAddress,
    noPayment: req.body.noPayment,
    otherReport: req.body.otherReport,
    iceCreams: req.body.iceCreams,
  });

  newCustomer
    .save()
    .then((customer) => res.json(customer))
    .catch((err) => res.status(400).json("Error: " + err));
});

// @route PATCH api/icecreams
// @desc Update customer values
// @access Public
router.patch("/:id", (req, res) => {
  Customer.findById(req.params.id)
    .then((customer) =>
      customer
        .updateOne({
          closed: req.body.closed,
          wrongAddress: req.body.wrongAddress,
          noPayment: req.body.noPayment,
          otherReport: req.body.otherReport,
        })
        .then(() => res.json({ updated: true }))
    )
    .catch((err) => res.status(404).json({ updated: false }));
});

// @route DELETE api/icecreams
// @desc Delete a customer
// @access Public
router.delete("/:id", (req, res) => {
  Customer.findById(req.params.id)
    .then((customer) =>
      customer.remove().then(() => res.json({ deleted: true }))
    )
    .catch((err) => res.status(404).json({ deleted: false }));
});

module.exports = router;
