import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek } from 'date-fns';
import FlexRow from '../../containers/FlexRow';
import Card from '../../containers/Card';
import Header from '../../components/Header';
import ShowValue from '../../components/ShowValue';
import api from '../../services/api';
import ReportChart from '../../components/Charts/Home';
import EmptyData from '../../components/EmptyData';
import ReportDetails from './DetailsTable/ReportDetails';
import { DateFilter } from '../../contexts/DateFilterContext';
import ConsiderUnpaidSelector from '../../components/ConsiderUnpaidSelector';
import SinglePageLoading from '../../components/SinglePageLoading';
import getTransactionsPerPeriod from './utils/getTransactionsPerPeriod';
import getTotals from './utils/getTotals';

const Home = () => {
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [monthTotals, setMonthTotals] = useState({});
  const [selectedDate] = useContext(DateFilter);
  const [loading, setLoading] = useState(true);
  const [considerUnpaid, setConsiderUnpaid] = useState(false);

  useEffect(() => {
    setLoading(true);

    const { CancelToken } = axios;
    const source = CancelToken.source();
    let unmountController = false;

    const initialDate = startOfWeek(startOfMonth(selectedDate));
    const finalDate = endOfWeek(endOfMonth(selectedDate));

    async function getTransactions() {
      try {
        const response = await api.get(
          `/weekly?initialDate=${initialDate}&finalDate=${finalDate}${
            !considerUnpaid ? `&paid=${!considerUnpaid}` : ''
          }`
        );
        if (!unmountController) {
          const transactionsPerPeriod = response.data;

          getTransactionsPerPeriod(
            selectedDate,
            setFilteredTransactions,
            transactionsPerPeriod
          );

          const [balance, expenses, income] = getTotals(transactionsPerPeriod);
          setMonthTotals({ balance, expenses, income });

          setLoading(false);
        }
      } catch (error) {
        throw new Error(error);
      }
    }
    getTransactions();

    return () => {
      unmountController = true;
      source.cancel();
    };
  }, [selectedDate, considerUnpaid]);

  return loading ? (
    <SinglePageLoading />
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
              color={
                parseFloat(monthTotals.balance) < 0 ? '#e00000' : '#00b300'
              }
              value={parseFloat(monthTotals.balance)}
              title="Balance"
            />
            <ShowValue
              color="#00b300"
              value={parseFloat(monthTotals.income)}
              title="Income"
            />
            <ShowValue
              color="#e00000"
              value={parseFloat(monthTotals.expenses)}
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
