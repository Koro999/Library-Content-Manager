const express = require('express');
const router = express.Router();
const User = require('../models/user');
const withAuth = require('../utils/auth');

// User registration
router.post('/register', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    req.session.logged_in = true;
    req.session.user_id = userData.id;
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      res.status(400).json({ message: 'No user with that email address!' });
      return;
    }

    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }

    req.session.logged_in = true;
    req.session.user_id = user.id;

    res.status(200).json({ user: user, message: 'You are now logged in!' });
  } catch (err) {
    res.status(400).json(err);
  }
});

// User logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Example route to get user info, only if authenticated
router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id);
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
