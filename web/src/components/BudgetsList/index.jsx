import React from 'react';
import PropType from 'prop-types';
import Pie from '../Graphs/Pie';
import useTransactions from '../../hooks/useTransactions';
import {
  BudgetWrapper,
  BudgetDetailsWrapper,
  BudgetDetailsTitle,
  BudgetDetailsContent,
  BudgetData,
  BudgetPercentage,
} from './styles';

const BudgetList = ({ data }) => {
  const [transactions, loading] = useTransactions();
  const budgets = [];

  data.forEach(budget => {
    const [expense] = transactions.filter(
      transaction => transaction.category === budget.id
    );

    if (expense) {
      budgets.push([
        {
          name: expense.title,
          value: parseFloat(expense.amount),
          id: expense.id,
        },
        {
          ...budget,
          value: budget.value - parseFloat(expense.amount),
        },
      ]);
    }
  });

  const colors = ['#ff8300', '#ccc'];
  return loading ? (
    <p>Loading...</p>
  ) : (
    budgets.map(budget => (
      <BudgetWrapper key={budget[1].id}>
        <BudgetData>
          <Pie
            data={budget}
            width={50}
            height={50}
            innerRadius={15}
            outerRadius={25}
            colors={colors}
          />
          <BudgetDetailsWrapper>
            <BudgetDetailsTitle>{budget[1].name}</BudgetDetailsTitle>
            <BudgetDetailsContent>
              Budget: R$ {budget[1].value + budget[0].value}
            </BudgetDetailsContent>
            <BudgetDetailsContent>
              Spent: R$ {budget[0].value}
            </BudgetDetailsContent>
          </BudgetDetailsWrapper>
        </BudgetData>
        <BudgetPercentage>
          {(
            (budget[0].value / (budget[0].value + budget[1].value)) *
            100
          ).toFixed(0)}
          %
        </BudgetPercentage>
      </BudgetWrapper>
    ))
  );
};

BudgetList.defaultProps = {
  data: {},
};

BudgetList.propTypes = {
  data: PropType.arrayOf(PropType.object),
};

export default BudgetList;
