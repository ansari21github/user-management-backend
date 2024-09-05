import express from 'express';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';

const router = express.Router();
const jwtSecret = "userMangement";


router.post('/createuser', [
  body('name', 'name is required').notEmpty(),
  body('email').isEmail(),
  body('password', 'Incorrect Password').isLength({ min: 5 })
], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const salt = await bcrypt.genSalt(10);
  const secPassword = await bcrypt.hash(req.body.password, salt);

  try {
    await User.create({
      name: req.body.name,
      password: secPassword,
      email: req.body.email
    });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.json({ success: false });
  }
});


router.post('/loginuser', [
  body('email').isEmail(),
  body('password', 'Incorrect Password').isLength({ min: 5 })
], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const userData = await User.findOne({ email });
    if (!userData) {
      return res.status(400).json({ errors: 'Try logging in with correct credentials' });
    }

    const pwdCompare = await bcrypt.compare(password, userData.password);
    if (!pwdCompare) {
      return res.status(400).json({ errors: 'Try logging in with correct credentials' });
    }

    const data = {
      user: {
        id: userData.id
      }
    };

    const authToken = jwt.sign(data, jwtSecret);
    res.json({ success: true, authToken });
  } catch (error) {
    console.error(error);
    res.json({ success: false });
  }
});

export default router;
