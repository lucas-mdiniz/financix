const express = require('express');
const User = require('../models/user');
const Transaction = require('../models/transaction');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/users/me', auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

router.post('/users', async (req, res) => {
  try {
    const user = new User(req.body);

    const token = await user.generateAuthToken();

    user.createCookie(res, token);

    res.status(201).send({ user, token });
  } catch (e) {
    if (e.name === 'MongoError' && e.code === 11000)
      res.status(409).send({ error: 'User email already exists.' });
    else res.status(500).send();
  }
});

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password,
      res
    );

    if (!user) {
      res.status(401).send({ error: 'Wrong credentials' });
    } else {
      const token = await user.generateAuthToken();

      user.createCookie(res, token);

      res.status(200).send({ user, token });
    }
  } catch (e) {
    res.status(400).send();
  }
});

router.post('/users/logout', auth, async (req, res) => {
  try {
    const { user } = req;

    user.tokens = user.tokens.filter((token) => token.token !== req.token);

    await user.save();

    res.clearCookie('token');
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send();
  }
});

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    const { user } = req;

    user.tokens = [];

    await user.save();

    res.status(200).send(user);
  } catch (e) {
    res.status(500).send();
  }
});

router.delete('/users/delete', auth, async (req, res) => {
  try {
    const { user } = req;

    const deletedUSer = await user.remove();

    await Transaction.deleteMany({ owner: user._id });

    res.send(deletedUSer);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
