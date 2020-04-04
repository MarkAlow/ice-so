const express = require("express");
const router = express.Router();

// Item Model

const IceCream = require("../../models/icecream");

// @route GET api/icecream
// @desc Get All icecreams
// @access Public
router.get("/", (req, res) => {
  IceCream.find()
    .sort({ name: -1 })
    .then(items => res.json(items));
});

// @route POST api/icecream
// @desc Create a IceCream
// @access Public
router.post("/", (req, res) => {
  const newIceCream = new IceCream({
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
    otherReport: req.body.otherReport
  });

  newIcecream
    .save()
    .then(customer => res.json(icecream))
    .catch(err => res.status(400).json("Error: " + err));
});

// @route PATCH api/icecreams
// @desc Update icecream values
// @access Public
router.patch("/:id", (req, res) => {
  IceCream.findById(req.params.id)
    .then(icecream =>
      icecream
        .update({
          closed: req.body.closed,
          wrongAddress: req.body.wrongAddress,
          noPayment: req.body.noPayment,
          otherReport: req.body.otherReport
        })
        .then(() => res.json({ updated: true }))
    )
    .catch(err => res.status(404).json({ updated: false }));
});

// @route DELETE api/icecreams
// @desc Delete a icecream
// @access Public
router.delete("/:id", (req, res) => {
  IceCream.findById(req.params.id)
    .then(icecream => icecream.remove().then(() => res.json({ deleted: true })))
    .catch(err => res.status(404).json({ deleted: false }));
});

module.exports = router;
