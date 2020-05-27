const express = require('express');
require('./models/budget');
require('./db/mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3333;
const transactionRouter = require('./routes/transaction');
const budgetRouter = require('./routes/budget');
const weeklyRouter = require('./routes/weekly');

app.use(cors());
app.use(express.json());
app.use(transactionRouter);
app.use(budgetRouter);
app.use(weeklyRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
