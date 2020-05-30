import { useState, useEffect } from 'react';
import Icons from '../assets/Icons';
import api from '../services/api';

const useCategories = () => {
  const [expenseCategories, setExpenseCategories] = useState([{}]);
  const [incomeCategories, setIncomeCategories] = useState([{}]);

  useEffect(() => {
    let isMounted = true;
    async function getCategories() {
      try {
        const response = await api.get('/budgets');
        if (isMounted) {
          setExpenseCategories(
            response.data.filter(category => category.type === 'expense')
          );
          setIncomeCategories(
            response.data.filter(category => category.type === 'income')
          );
        }
      } catch (error) {
        throw new Error(error);
      }
    }

    getCategories();
    return () => {
      isMounted = false;
    };
  }, []);

  const expenses = expenseCategories.map(expense => {
    return {
      label: expense.name || '',
      value: expense.slug || '',
      icon: Icons.expense[expense.slug] || '',
      id: expense._id,
      type: expense.type,
    };
  });

  const incomes = incomeCategories.map(income => {
    return {
      label: income.name || '',
      value: income.slug || '',
      icon: Icons.income[income.slug] || '',
      id: income.id,
      type: income.type,
    };
  });

  return [expenses, incomes];
};

export default useCategories;
