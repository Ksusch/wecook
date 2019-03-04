const express = require('express');
const router = express.Router();
const { isActiveUser } = require('../src/middlewares');
const Pet = require('../models/Pet');
const User = require('../models/User');
const passport = require('passport');
const localAuth = passport.authenticate('local');


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

// add image

router.post("/image/add", (req, res, next) => {
  console.log("I am trying to update the user photo", req.body.imageUrl, req.user)
  if (req.body.type === "User") {
    User.findOneAndUpdate(
      {
        $or: [
          { _id: req.user.id },
          { googleId: req.user.id },
          { twitterId: req.user.id },
          { facebookId: req.user.id },
        ],
      },
      {
        image: req.body.imageUrl
      }
    )
      .then(user => {
        console.log("I have updated the user photo", user)
        let userData = user
        userData.password = undefined
        res.status(200).json(userData)
      })
      .catch(err => console.error(err))
  }
  else {
    Pet.findOneAndUpdate(
      { _id: req.body.id },
      { image: req.body.imageUrl }
    )
      .then(pet => res.status(200).json(pet))
      .catch(err => console.error(err))
  }
})

module.exports = router;
