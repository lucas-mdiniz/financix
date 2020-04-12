export default transactions => {
  let income = 0;
  let expenses = 0;
  let predictedIncome = 0;
  let predictedExpenses = 0;

  transactions.forEach(transaction => {
    if (transaction.type === 'expense') {
      if (transaction.paid) {
        expenses += transaction.amount;
      } else {
        predictedExpenses += transaction.amount;
      }
    } else if (transaction.type === 'income') {
      if (transaction.paid) {
        income += transaction.amount;
      } else {
        predictedIncome += transaction.amount;
      }
    }
  });

  predictedExpenses += expenses;
  predictedIncome += income;

  const balance = (income - expenses).toFixed(2);
  const predictedBalance = (predictedIncome - predictedExpenses).toFixed(2);

  return {
    income,
    predictedIncome,
    expenses,
    predictedExpenses,
    balance,
    predictedBalance,
  };
};
