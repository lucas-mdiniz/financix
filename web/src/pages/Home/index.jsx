import React, { useEffect, useState } from 'react';
import FlexRow from '../../containers/FlexRow';
import ShowValue from '../../components/ShowValue';
import PageTitle from '../../components/PageTitle';
import Card from '../../containers/Card';
import useTransactions from '../../hooks/useTransactions';
import getTotals from '../../utils/getTotals';
import ReportGraph from '../../components/Graphs/Home';
import api from '../../services/api';
import { addWeeks, startOfWeek, format } from 'date-fns';

const Home = () => {
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [transactions, setTransactions] = useTransactions([]);
  const [loading, setLoading] = useState(true);
  const { balance, income, expenses } = getTotals(transactions);

  useEffect(() => {
    async function getTransactionsPerPeriod() {
      const date = new Date();
      const initialDate = new Date(
        Date.UTC(date.getFullYear(), date.getMonth(), 1)
      ).toISOString();
      const finalDate = new Date(
        Date.UTC(date.getFullYear(), date.getMonth() + 1, 0)
      ).toISOString();

      try {
        const response = await api.get(
          `/filter?initialDate=${initialDate}&finalDate=${finalDate}`
        );

        const parsedTransactions = response.data.map(filteredTransaction => {
          const startOfWeekDate = startOfWeek(
            addWeeks(
              new Date(filteredTransaction._id.year, 0, 0),
              filteredTransaction._id.week
            ),
            { weekStartsOn: 0 }
          );
          const formatedDate = format(startOfWeekDate, 'dd MMM');

          return {
            value: filteredTransaction.amount,
            name: formatedDate,
            id: filteredTransaction.id[0],
            type: filteredTransaction._id.type,
            date: startOfWeekDate,
          };
        });

        setFilteredTransactions(parsedTransactions);
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }

    getTransactionsPerPeriod();
  }, []);

  return loading ? (
    <p>Loading</p>
  ) : (
    <>
      <PageTitle>Home</PageTitle>
      <FlexRow>
        <ShowValue
          color="#00b300"
          value={parseFloat(balance)}
          title="Balance"
        />
        <ShowValue color="#00b300" value={parseFloat(income)} title="Income" />
        <ShowValue
          color="#e00000"
          value={parseFloat(expenses)}
          title="Expenses"
        />
      </FlexRow>
      <Card borderRadius="10px" horizontalMargin="15px" padding="30px">
        <ReportGraph width={800} height={350} data={filteredTransactions} />
      </Card>
    </>
  );
};

export default Home;
