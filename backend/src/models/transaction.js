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
  description: {
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
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
});

module.exports = Transaction;
