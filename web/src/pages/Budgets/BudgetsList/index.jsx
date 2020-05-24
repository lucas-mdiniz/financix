import React from 'react';
import PropTypes from 'prop-types';
import Pie from '../../../components/Charts/Pie';
import {
  BudgetWrapper,
  BudgetDetailsWrapper,
  BudgetDetailsTitle,
  BudgetDetailsContent,
  BudgetData,
  BudgetPercentage,
} from './styles';
import EmptyData from '../../../components/EmptyData';

const BudgetList = ({ budgets, transactions }) => {
  const budgetsList = [];

  budgets.forEach(budget => {
    const expenses = transactions.filter(
      transaction => transaction.category.value === budget.slug
    );

    if (expenses.length > 0) {
      const expensesValue = Object.values(expenses).reduce(
        (acc, { amount }) => (acc.amount || acc) + amount
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
    <EmptyData>You don&apos;t have expenses for your budgets yet!</EmptyData>
  ) : (
    budgetsList.map(
      budget =>
        budget.value > 0 && (
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
        )
    )
  );
};

BudgetList.propTypes = {
  budgets: PropTypes.arrayOf(PropTypes.object).isRequired,
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BudgetList;
