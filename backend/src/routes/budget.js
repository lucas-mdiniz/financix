const express = require('express');
const Budget = require('../models/budget');

const router = express.Router();

router.get('/budgets', async (req, res) => {
  try {
    const budgets = await Budget.find();

    res.send(budgets);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch('/budgets/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = 'amount';

  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const budget = await Budget.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!budget) {
      return res.status(404).send();
    }

    res.send(budget);
  } catch (e) {
    res.status.send(400);
  }
});

module.exports = router;
