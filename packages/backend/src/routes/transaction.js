const express = require('express');

const auth = require('../middleware/auth');

const Transaction = require('../models/transaction');
const User = require('../models/user');

const router = express.Router();

router.post('/transactions', auth, async (req, res) => {
  const transaction = new Transaction({ ...req.body, owner: req.user._id });
  try {
    await transaction.save();

    res.status(201).send(transaction);
  } catch (e) {
    res.status(400).send();
  }
});

router.get('/transactions', auth, async (req, res) => {
  const conditions = {};
  const { initialDate, finalDate, paid } = req.query;

  if (initialDate && finalDate) {
    conditions.date = {
      $gte: new Date(initialDate),
      $lte: new Date(finalDate),
    };
  }

  if (paid) {
    if (paid === 'true') conditions.paid = true;
    else conditions.paid = false;
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
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$owner', '$$id'],
                },
                ...conditions,
              },
            },
          ],
          as: 'transactions',
        },
      },
    ]);

    res.send(user[0].transactions);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.put('/transactions/:id', auth, async (req, res) => {
  const _id = req.params.id;
  const updates = Object.keys(req.body);
  const notAlowedUpdates = ['_id', 'owner'];

  const isValidOperation = updates.every(
    (update) => !notAlowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    res.status(400).send({ error: 'invalid Updates!' });
  } else {
    try {
      const transaction = await Transaction.findOne({
        _id,
        owner: req.user._id,
      });

      if (!transaction) res.status(404).send();
      else {
        updates.forEach((update) => {
          transaction[update] = req.body[update];
        });

        await transaction.save();

        res.send(transaction);
      }
    } catch (e) {
      res.status(400).send();
    }
  }
});

router.get('/transactions/:id', auth, async (req, res) => {
  try {
    const transaction = await Transaction.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });

    if (!transaction) res.status(404).send();
    else res.send(transaction);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch('/transactions/:id', auth, async (req, res) => {
  const _id = req.params.id;

  const updates = Object.keys(req.body);
  const notAlowedUpdates = ['_id', 'owner'];

  const isValidOperation = updates.every(
    (update) => !notAlowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    res.status(400).send({ error: 'invalid Updates!' });
  } else {
    try {
      const transaction = await Transaction.findOne({
        _id,
        owner: req.user._id,
      });

      if (!transaction) {
        res.status(404).send();
      } else {
        updates.forEach((update) => {
          transaction[update] = req.body[update];
        });

        await transaction.save();

        res.send(transaction);
      }
    } catch (e) {
      res.status(400).send(e);
    }
  }
});

router.delete('/transactions/:id', auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const transaction = await Transaction.findOneAndDelete({
      _id,
      owner: req.user._id,
    });

    if (!transaction) {
      res.status(404).send();
    }

    res.send(transaction);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
