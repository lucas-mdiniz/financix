import React, { useEffect, useState, useContext } from 'react';
import { addWeeks, startOfWeek, format } from 'date-fns';
import FlexRow from '../../containers/FlexRow';
import Card from '../../containers/Card';
import Header from '../../components/Header';
import ShowValue from '../../components/ShowValue';
import useTransactions from '../../hooks/useTransactions';
import getTotals from '../../utils/getTotals';
import ReportChart from '../../components/Charts/Home';
import EmptyData from '../../components/EmptyData';
import api from '../../services/api';
import ReportDetails from './DetailsTable/ReportDetails';
import { DateFilter } from '../../contexts/DateFilterContext';
import ConsiderUnpaidSelector from '../../components/ConsiderUnpaidSelector';
import getWeeksOfMonth from '../../utils/getWeeksOfMonth';

const Home = () => {
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [selectedDate] = useContext(DateFilter);
  const [transactions] = useTransactions();
  const [loading, setLoading] = useState(true);
  const { balance, income, expenses } = getTotals(transactions);
  const [considerUnpaid, setConsiderUnpaid] = useState(false);

  useEffect(() => {
    async function getTransactionsPerPeriod() {
      const initialDate = new Date(
        Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
      ).toISOString();
      const finalDate = new Date(
        Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0)
      ).toISOString();

      try {
        const response = await api.get(
          `/weekly?initialDate=${initialDate}&finalDate=${finalDate}${
            !considerUnpaid ? `&paid=${!considerUnpaid}` : ''
          }`
        );

        const weeksOfMonth = getWeeksOfMonth(selectedDate);

        let weeklyBalance = 0;
        const parsedTransactions = weeksOfMonth.map(transactionWeek => {
          const transactionIndex = response.data.findIndex(
            transaction => transaction.week === transactionWeek.week
          );

          const filteredTransaction =
            response.data[transactionIndex] || transactionWeek;

          const startOfWeekDate = startOfWeek(
            addWeeks(
              new Date(filteredTransaction.year, 0, 0),
              filteredTransaction.week
            ),
            { weekStartsOn: 0 }
          );
          const formatedDate = format(startOfWeekDate, 'dd MMM');

          weeklyBalance =
            weeklyBalance +
            filteredTransaction.earning -
            filteredTransaction.expense;

          return {
            name: formatedDate,
            date: startOfWeekDate,
            balance: weeklyBalance,
            ...filteredTransaction,
          };
        });

        setFilteredTransactions(parsedTransactions);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }

    getTransactionsPerPeriod();
  }, [selectedDate, considerUnpaid]);

  return loading ? (
    <p>Loading</p>
  ) : (
    <>
      <Header>Home</Header>
      <ConsiderUnpaidSelector
        setConsiderUnpaid={setConsiderUnpaid}
        considerUnpaid={considerUnpaid}
      />
      {filteredTransactions.length === 0 ? (
        <Card borderRadius="10px" horizontalMargin="15px" padding="30px">
          <EmptyData>You don&apos;t have transactions yet!</EmptyData>
        </Card>
      ) : (
        <>
          <FlexRow>
            <ShowValue
              color={parseFloat(balance) < 0 ? '#e00000' : '#00b300'}
              value={parseFloat(balance)}
              title="Balance"
            />
            <ShowValue
              color="#00b300"
              value={parseFloat(income)}
              title="Income"
            />
            <ShowValue
              color="#e00000"
              value={parseFloat(expenses)}
              title="Expenses"
            />
          </FlexRow>
          <Card borderRadius="10px" horizontalMargin="15px" padding="30px">
            {filteredTransactions.length === 0 ? (
              <EmptyData>You don&apos;t have transactions yet!</EmptyData>
            ) : (
              <ReportChart
                width={800}
                height={350}
                data={filteredTransactions}
                date={selectedDate}
              />
            )}
          </Card>
          <ReportDetails filteredTransactions={filteredTransactions} />
        </>
      )}
    </>
  );
};

export default Home;
