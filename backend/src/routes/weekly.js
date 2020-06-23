const express = require('express');
const User = require('../models/user');

const auth = require('../middleware/auth');

const router = express.Router();

router.get('/weekly', auth, async (req, res) => {
  const { initialDate, finalDate, paid } = req.query;

  const pipeline = [
    {
      $match: {
        $expr: {
          $eq: ['$owner', '$$id'],
        },
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
    const user = await User.aggregate([
      {
        $match: {
          _id: req.user._id,
        },
      },
      {
        $lookup: {
          from: 'transactions',
          let: { id: '$_id' },
          pipeline,
          as: 'transactions',
        },
      },
    ]);

    const sortedTransactions = user[0].transactions.sort(
      (a, b) => a.week - b.week
    );
    res.send(sortedTransactions);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
