const express = require('express');
const Transaction = require('../models/transaction');

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

    const sortedTransactions = transactions.sort(
      (a, b) => a._id.week - b._id.week
    );

    res.send(sortedTransactions);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
