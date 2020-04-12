const mongoose = require('mongoose');

const Transaction = mongoose.model('Transaction', {
  amount: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  decription: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  paid: {
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

module.exports = Transaction;
