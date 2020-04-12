const express = require('express');
const Transaction = require('../models/transaction');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

router.get('/filter', async (req, res) => {
  const { initialDate, finalDate } = req.query;

  try {
    const transactions = await Transaction.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(initialDate),
            $lte: new Date(finalDate),
          },
        },
      },
      {
        $project: {
          type: '$type',
          date: '$date',
          amount: '$amount',
          id: '$_id',
        },
      },
      {
        $group: {
          _id: {
            week: { $week: '$date' },
            year: { $year: '$date' },
            type: '$type',
          },
          amount: { $sum: '$amount' },
          id: { $addToSet: '$id' },
        },
      },
    ]);

    if (!transactions) {
      return res.status(404).send();
    }

    res.send(transactions);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
