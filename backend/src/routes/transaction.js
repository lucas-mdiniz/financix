const express = require('express');
const Transaction = require('../models/transaction');

const router = express.Router();

router.post('/transactions', async (req, res) => {
  const transaction = new Transaction(req.body);

  try {
    await transaction.save();

    res.status(201).send(transaction);
  } catch (e) {
    res.status(400).send();
  }
});

router.get('/transactions', async (req, res) => {
  const conditions = {};
  const { initialDate, finalDate, paid } = req.query;

  if (initialDate && finalDate) {
    conditions.date = {
      $gte: initialDate,
      $lte: finalDate,
    };
  }

  if (paid) {
    if (paid === 'true') conditions.paid = true;
    else conditions.paid = false;
  }

  try {
    const transactions = await Transaction.find(conditions);

    res.send(transactions);
  } catch (e) {
    res.status(500).send();
  }
});

router.put('/transactions/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!transaction) res.status(404).send();
    else res.send(transaction);
  } catch (e) {
    res.status(400).send();
  }
});

router.get('/transactions/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) res.status(404).send();
    else res.send(transaction);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch('/transactions/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const notAlowedUpdates = ['type', '_id'];

  const isNotValidOperation = updates.every((update) =>
    update.includes(notAlowedUpdates)
  );

  if (isNotValidOperation) {
    res.status(400).send({ error: 'invalid Updates!' });
  } else {
    try {
      const transaction = await Transaction.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      if (!transaction) res.status(404).send();
      else res.send(transaction);
    } catch (e) {
      res.status(400).send();
    }
  }
});

router.delete('/transactions/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);

    if (!transaction) {
      res.status(404).send();
    }

    res.send(transaction);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
