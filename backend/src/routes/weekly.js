const express = require('express');
const Transaction = require('../models/transaction');

const router = express.Router();

router.get('/weekly', async (req, res) => {
  const { initialDate, finalDate, paid } = req.query;

  const pipeline = [
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
        expense: {
          $cond: {
            if: { $eq: ['expense', '$type'] },
            then: '$amount',
            else: '$$REMOVE',
          },
        },
        earning: {
          $cond: {
            if: { $eq: ['income', '$type'] },
            then: '$amount',
            else: '$$REMOVE',
          },
        },
        date: '$date',
        id: '$_id',
      },
    },
    {
      $group: {
        _id: {
          week: { $week: '$date' },
          year: { $year: '$date' },
        },
        expense: { $sum: '$expense' },
        earning: { $sum: '$earning' },
        id: { $addToSet: '$id' },
      },
    },
    {
      $project: {
        _id: { $arrayElemAt: ['$id', 0] },
        week: '$_id.week',
        year: '$_id.year',
        expense: '$expense',
        earning: '$earning',
      },
    },
  ];

  if (paid) {
    if (paid === 'true') pipeline[0].$match.paid = true;
    else pipeline[0].$match.paid = false;
  }

  try {
    const transactions = await Transaction.aggregate(pipeline);

    if (!transactions) {
      res.status(404).send();
    } else {
      const sortedTransactions = transactions.sort((a, b) => a.week - b.week);
      res.send(sortedTransactions);
    }
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
