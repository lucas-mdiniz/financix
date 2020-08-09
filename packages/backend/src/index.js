const express = require('express');
require('dotenv-safe').config();
require('./db/mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 5000;
const transactionRouter = require('./routes/transaction');
const budgetRouter = require('./routes/budget');
const weeklyRouter = require('./routes/weekly');
const userRouter = require('./routes/user');

app.use(cookieParser());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(transactionRouter);
app.use(budgetRouter);
app.use(weeklyRouter);
app.use(userRouter);

app.listen(port);
