import React, { useEffect, useState } from 'react';
import FlexRow from '../../containers/FlexRow';
import Card from '../../containers/Card';
import ShowValue from '../../components/ShowValue';
import PageTitle from '../../components/PageTitle';
import useTransactions from '../../hooks/useTransactions';
import getTotals from '../../utils/getTotals';
import ReportChart from '../../components/Charts/Home';
import EmptyData from '../../components/EmptyData';
import api from '../../services/api';
import { addWeeks, startOfWeek, format } from 'date-fns';
import ReportDetails from './DetailsTable/ReportDetails';

const Home = () => {
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [transactions] = useTransactions([]);
  const [loading, setLoading] = useState(true);
  const { balance, income, expenses } = getTotals(transactions);

  useEffect(() => {
    async function getTransactionsPerPeriod() {
      const date = new Date('04/04/2020');
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

        let balance = 0;
        const parsedTransactions = response.data.map(filteredTransaction => {
          const startOfWeekDate = startOfWeek(
            addWeeks(
              new Date(filteredTransaction.year, 0, 0),
              filteredTransaction.week
            ),
            { weekStartsOn: 0 }
          );
          const formatedDate = format(startOfWeekDate, 'dd MMM');

          balance =
            balance + filteredTransaction.earning - filteredTransaction.expense;

          return {
            name: formatedDate,
            date: startOfWeekDate,
            balance,
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
  }, []);

  return loading ? (
    <p>Loading</p>
  ) : (
    <>
      <PageTitle>Home</PageTitle>
      {filteredTransactions.length === 0 ? (
        <Card borderRadius="10px" horizontalMargin="15px" padding="30px">
          <EmptyData>You don't have transactions yet!</EmptyData>
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
              <EmptyData>You don't have transactions yet!</EmptyData>
            ) : (
              <ReportChart
                width={800}
                height={350}
                data={filteredTransactions}
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
