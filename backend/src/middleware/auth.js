const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    const { _id } = jwt.verify(token, 'thisIsASecret');

    const user = await User.findOne({ _id, 'tokens.token': token });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;

    next();
  } catch (e) {
    res.status(403).send({ error: 'Please authenticate!' });
  }
};

module.exports = auth;
