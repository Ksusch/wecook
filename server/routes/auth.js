const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post("/login", (req, res, next) => console.log(req)
) 

router.post("/signup", (req, res, next) => console.log(req)) 

module.exports = router;
