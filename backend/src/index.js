const express = require('express');
require('./models/budget');
require('./db/mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3333;
const transactionRouter = require('./routes/transaction');
const budgetRouter = require('./routes/budget');
const filterRouter = require('./routes/filter');

app.use(cors());
app.use(express.json());
app.use(transactionRouter);
app.use(budgetRouter);
app.use(filterRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
