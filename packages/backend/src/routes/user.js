const express = require('express');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
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

router.patch('/users/password-update', auth, async (req, res) => {
  try {
    const { user } = req;

    const passwordIsMatch = await bcrypt.compare(
      req.body.currentPassword,
      user.password
    );

    if (!passwordIsMatch) {
      res.status(409).send({ error: 'Your password is wrong' });
    } else {
      user.password = req.body.password;
      await user.save();
      res.send();
    }
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

router.post('/users/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const resetPasswordToken = await user.generatePasswordRecoveryToken();

      user.resetPasswordToken = resetPasswordToken;

      await user.save();

      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD,
        },
      });

      const message = {
        from: process.env.SMTP_FROM,
        to: email,
        subject: 'Financix - Password Recovery',
        text: `To reset your password acess the link: ${user.resetPasswordToken}`,
        html: `<p>To reset your password acess the link bellow:</p> 
        <a href="http://${process.env.DOMAIN}/password-recovery/${user.resetPasswordToken}">Reset Password</a>`,
      };

      await transporter.sendMail(message);
    }

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

router.post('/password-recovery/:token', async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const { _id } = jwt.verify(token, process.env.RECOVERY_TOKEN_SECRET);
    const user = await User.findOne({ _id, resetPasswordToken: token });

    if (!user) {
      res.status(401).send();
    } else {
      user.password = newPassword;
      user.resetPasswordToken = '';

      user.save();

      res.send();
    }
  } catch (e) {
    if (e.message === 'invalid token' || e.name === 'TokenExpiredError')
      res.status(401).send();
    else res.status(500).send(e);
  }
});

module.exports = router;
