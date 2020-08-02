import { addWeeks, startOfWeek, format } from 'date-fns';
import getWeeksOfMonth from '../../../utils/getWeeksOfMonth';

const getTransactionsPerPeriod = (
  selectedDate,
  setFilteredTransactions,
  transactionsPerPeriod
) => {
  const weeksOfMonth = getWeeksOfMonth(selectedDate);

  let weeklyBalance = 0;
  const parsedTransactions = weeksOfMonth.map(transactionWeek => {
    const transactionIndex = transactionsPerPeriod.findIndex(
      transaction => transaction.week === transactionWeek.week
    );

    const filteredTransaction =
      transactionsPerPeriod[transactionIndex] || transactionWeek;

    const startOfWeekDate = startOfWeek(
      addWeeks(
        new Date(filteredTransaction.year, 0, 0),
        filteredTransaction.week
      ),
      { weekStartsOn: 0 }
    );
    const formatedDate = format(startOfWeekDate, 'dd MMM');

    weeklyBalance =
      weeklyBalance + filteredTransaction.earning - filteredTransaction.expense;

    return {
      name: formatedDate,
      date: startOfWeekDate,
      balance: weeklyBalance,
      ...filteredTransaction,
    };
  });
  setFilteredTransactions(parsedTransactions);
};

export default getTransactionsPerPeriod;
