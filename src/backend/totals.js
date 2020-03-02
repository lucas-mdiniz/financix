import parseCurrencyFloat from '../utils/parseCurrencyFloat';

export default transactions => {
  let income = 0;
  let expenses = 0;
  let predictedIncome = 0;
  let predictedExpenses = 0;

  // vou filtrar por pago ou n e add, depois fazer o post
  transactions.forEach(transaction => {
    if (transaction.type === 'expense') {
      if (transaction.paid) {
        expenses += parseCurrencyFloat(transaction.amount);
      } else {
        predictedExpenses += parseCurrencyFloat(transaction.amount);
      }
    } else if (transaction.type === 'income') {
      if (transaction.paid) {
        income += parseCurrencyFloat(transaction.amount);
      } else {
        predictedIncome += parseCurrencyFloat(transaction.amount);
      }
    }
  });

  predictedExpenses += expenses;
  predictedIncome += income;
  const balance = income - expenses;
  const predictedBalance = predictedIncome - predictedExpenses;

  return {
    income,
    predictedIncome,
    expenses,
    predictedExpenses,
    balance,
    predictedBalance,
  };
};
