const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { registerValidation, loginValidation } = require('../validation');

router.post('/register', async (req, res) => {

  console.log("BODY");
  console.log(req.body);

  console.log('registering...');

  // Validate request body
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Check if the user is already in database
  const emailExists = await User.findOne({email: req.body.email});
  if (emailExists) return res.status(400).send('Email already exists');

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // Create new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword 
  });

  try {
    // Save the new user
    const savedUser = await user.save(); 
    res.send({user: user._id});
  } catch(err) {
    res.status(400).send(err);
  }
});

router.post('/login', async (req, res) => {
  // Validate request body
  const { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Make sure the email exists in database
  const user = await User.findOne({email: req.body.email});
  if (!user) return res.status(400).send('Email is not found');

  // Check to see if password is valid
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Password is invalid');

  // Create and assign a token
  const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET);
  res.header('auth-token', token).send(token);
});

module.exports = router;
