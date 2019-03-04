const express = require('express');
const router = express.Router();
const { isActiveUser } = require('../src/middlewares');
const Pet = require('../models/Pet');
const User = require('../models/User');

router.get('/pet', isActiveUser, (req, res, next) => {
  // TODO get only pets from this user
  Pet.find()
    .then(pets => {
      return res.json(pets);
    })
    .catch(err => console.log(err));
});

router.post('/pet', isActiveUser, (req, res, next) => {
  Pet.create({
    name: req.body.name,
    animal: req.body.animal,
    description: req.body.description,
    image: req.body.image,
    owner: req.user.id
  })
    .then(pet =>
      res.json({
        success: true,
        pet
      })
    )
    .catch(err => console.log(err));
});

router.put('/pet/:id', isActiveUser, (req, res, next) => {
  Pet.findOneAndUpdate(
    { _id: req.params.id },
    {
      name: req.body.name,
      animal: req.body.animal,
      description: req.body.description,
      image: req.body.image
    }
  )
    .then(pet =>
      res.json({
        message: 'pet updated',
        pet
      })
    )
    .catch(err => console.log(err));
});

router.delete('/pet/:id', isActiveUser, (req, res, next) => {
  Pet.findOneAndDelete({ _id: req.params.id })
    .then(pet =>
      res.json({
        message: 'pet deleted',
        pet
      })
    )
    .catch(err => console.log(err));
});

module.exports = router;
