const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const budgetsMock = require('../utils/budgetsMock');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  },
  budgets: [
    {
      name: {
        type: String,
        required: true,
      },
      slug: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        default: 0,
      },
    },
  ],
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  resetPasswordToken: {
    type: String,
    select: false,
  },
});

/* remove hidden fields from responses */
userSchema.methods.toJSON = function hiddenFields() {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

/* generate a new token with JWT and save to the user */
userSchema.methods.generateAuthToken = async function generateAuthToken() {
  const user = this;

  const token = jwt.sign(
    { _id: user._id.toString() },
    process.env.AUTH_TOKEN_SECRET
  );

  user.tokens = user.tokens.concat({ token });

  await user.save();

  return token;
};

userSchema.methods.generatePasswordRecoveryToken = async function generatePasswordRecoveryToken() {
  try {
    const user = this;

    const token = jwt.sign(
      { _id: user._id.toString() },
      process.env.RECOVERY_TOKEN_SECRET,
      { expiresIn: '1h' }
    );

    user.resetPasswordToken = token;

    await user.save();

    return token;
  } catch (e) {
    throw new Error(e);
  }
};

userSchema.methods.createCookie = (res, token) => {
  const cookieExpireDays = 10;
  res.cookie('token', token, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * cookieExpireDays),
    httpOnly: true,
    SameSite: 'None',
    Secure: true,
  });
};

userSchema.pre('save', async function hashPassword(next) {
  /* hash the password before saving in the database with bcrypt */
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  /* create budgets for new users */
  if (user.isNew) {
    user.budgets = budgetsMock;
    next();
  }

  next();
});

/* find user by email and check the password and return the user */
userSchema.statics.findByCredentials = async function findByCredentials(
  email,
  password,
  res
) {
  // eslint-disable-next-line
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).send({ error: 'Unable to login' });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).send({ error: 'Unable to login' });
  }

  return user;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
