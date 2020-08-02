const getTotals = filteredTransactions => {
  let balance = 0;
  let expenses = 0;
  let income = 0;

  filteredTransactions.forEach(transactionsWeek => {
    expenses += transactionsWeek.expense;
    income += transactionsWeek.earning;
  });

  balance = income - expenses;

  return [balance, expenses, income];
};

export default getTotals;
