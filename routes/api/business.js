const express = require("express");
const router = express.Router();

// Item Model

const Business = require("../../models/business");

// @route GET api/business
// @desc Get All businesss
// @access Public
router.get("/", (req, res) => {
  Business.find()
    .sort({ name: -1 })
    .then((items) => res.json(items));
});

// @route POST api/business
// @desc Create a Customer
// @access Public
router.post("/", (req, res) => {
  const newBusiness = new Business({
    requestId: req.body.requestId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    message: req.body.message,
  });

  newBusiness
    .save()
    .then((business) => res.json(business))
    .catch((err) => res.status(400).json("Error: " + err));
});

// @route DELETE api/business
// @desc Delete a business
// @access Public
router.delete("/:id", (req, res) => {
  Customer.findById(req.params.id)
    .then((business) =>
      business.remove().then(() => res.json({ deleted: true }))
    )
    .catch((err) => res.status(404).json({ deleted: false }));
});

module.exports = router;
