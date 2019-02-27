const express = require('express');
const router = express.Router();
const Offering = require('../models/Offering');

router.get('/offerings', (req, res, next) => {
  Offering.find()
    .then(offerings => res.json(offerings))
    .catch(err => console.log(err));
});

router.post('/add/offering', (req, res, next) => {
  Offering.create({
    title: req.body.title,
      description: req.body.description,
      quantity: req.body.quantity,
      fromDate: req.body.fromDate,
      toDate: req.body.toDate,
      ingredients: req.body.ingredients,
      category: req.body.category,
      image: req.body.image,
      delivery: req.body.delivery,
      user: req.user.id
  })
    .then(offering =>
      res.json({
        success: true,
        offering
      })
    )
    .catch(err => console.log(err));
});

router.put('/update/offering', (req, res, next) => {
  Offering.findOneAndUpdate(
    { _id: req.body._id },
    {
      name: req.body.name,
      quantity: req.body.quantity,
      orders: req.body.orders,
      availability: req.body.availability,
      ingredients: req.body.ingredients,
      category: req.body.category,
      image: req.body.image,
      delivery: req.body.delivery
    }
  )
    .then(offering =>
      res.json({
        message: 'offering updated',
        offering
      })
    )
    .catch(err => console.log(err));
});

router.delete('/delete/offering', (req, res, next) => {
  Offering.findOneAndDelete({ _id: req.body._id })
    .then(offering =>
      res.json({
        message: 'offering deleted',
        offering
      })
    )
    .catch(err => console.log(err));
});

module.exports = router;
