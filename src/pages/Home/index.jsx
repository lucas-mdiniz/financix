import React from 'react';
import FlexRow from '../../containers/FlexRow';
import ShowValue from '../../components/ShowValue';
import PageTitle from '../../components/PageTitle';
import Card from '../../containers/Card';
import useTransactions from '../../hooks/useTransactions';
import totals from '../../backend/totals';
import ReportGraph from '../../components/Graphs/Home';

const Home = () => {
  const [transactions, loading] = useTransactions([]);
  const { balance, income, expenses } = totals(transactions);

  const parsedTransactions = transactions.map(transaction => {
    const date = new Date(transaction.date);
    const parsedDate = ` ${date.getUTCDate()}/${date.getUTCMonth()}/${date
      .getUTCFullYear()
      .toString()
      .slice(-2)}`;

    return {
      value: transaction.amount,
      name: parsedDate,
      id: transaction.id,
      type: transaction.type,
    };
  });

  console.log(parsedTransactions);

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
        <ShowValue color="#00b300" value={income} title="Income" />
        <ShowValue color="#e00000" value={expenses} title="Expenses" />
      </FlexRow>
      <Card borderRadius="10px" horizontalMargin="15px">
        <ReportGraph width={500} height={500} data={parsedTransactions} />
      </Card>
    </>
  );
};

export default Home;
