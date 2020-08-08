const express = require('express');

const auth = require('../middleware/auth');

const router = express.Router();

router.get('/budgets', auth, (req, res) => {
  try {
    const { budgets } = req.user;

    if (!budgets) res.status(404).send();
    else res.send(budgets);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch('/budgets/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { budgets } = req.user;
  const updates = Object.keys(req.body);
  const allowedUpdates = ['amount'];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    res.status(400).send({ error: 'Invalid updates!' });
  } else {
    try {
      const budget = budgets.filter((currentBudget) => {
        if (currentBudget.id === id) {
          updates.forEach((update) => {
            currentBudget[update] = req.body[update];
          });
        }
        return currentBudget.id === id;
      });

      await req.user.save();

      if (!budget) res.status(404).send();
      else res.send(budget);
    } catch (e) {
      res.status(400).send(e);
    }
  }
});

module.exports = router;
