import React from 'react';
import PropType from 'prop-types';
import Pie from '../Charts/Pie';
import {
  BudgetWrapper,
  BudgetDetailsWrapper,
  BudgetDetailsTitle,
  BudgetDetailsContent,
  BudgetData,
  BudgetPercentage,
} from './styles';
import EmptyData from '../EmptyData';

const BudgetList = ({ budgets, transactions }) => {
  let budgetsList = [];

  budgets.forEach(budget => {
    const expenses = transactions.filter(
      transaction => transaction.category === budget.slug
    );

    if (expenses.length > 0) {
      const expensesValue = Object.values(expenses).reduce(
        (acc, { amount }) => acc.amount + amount
      );

      budgetsList.push({
        ...budget,
        value: budget.value,
        expenses: expensesValue.amount || expensesValue,
      });
    }
  });

  const returnColors = budget => {
    if (budget.expenses / budget.value < 1) {
      return ['#ff8300', '#ccc'];
    }
    return ['#ff7f7f', '#ccc'];
  };

  return budgetsList.length === 0 ? (
    <EmptyData>You don't have expenses for your budgets yet!</EmptyData>
  ) : (
    budgetsList.map(budget => (
      <BudgetWrapper key={budget._id}>
        <BudgetData>
          <Pie
            data={[
              { value: budget.expenses },
              { value: budget.value - budget.expenses },
            ]}
            width={50}
            height={50}
            innerRadius={15}
            outerRadius={25}
            colors={returnColors(budget)}
          />
          <BudgetDetailsWrapper>
            <BudgetDetailsTitle>{budget.name}</BudgetDetailsTitle>
            <BudgetDetailsContent>
              Budget: R$ {budget.value}
            </BudgetDetailsContent>
            <BudgetDetailsContent>
              Spent: R$ {budget.expenses}
            </BudgetDetailsContent>
          </BudgetDetailsWrapper>
        </BudgetData>
        <BudgetPercentage>
          {((budget.expenses / budget.value) * 100).toFixed(0)}%
        </BudgetPercentage>
      </BudgetWrapper>
    ))
  );
};

BudgetList.defaultProps = {
  budgets: {},
};

BudgetList.propTypes = {
  data: PropType.arrayOf(PropType.object),
};

export default BudgetList;
