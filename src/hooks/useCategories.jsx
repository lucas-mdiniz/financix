import { useState, useEffect } from 'react';
import Icons from '../assets/Icons';
import api from '../services/api';

const useCategories = () => {
  const [expenseCategories, setExpenseCategories] = useState([{}]);
  const [earningCategories, setEarningCategories] = useState([{}]);

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await api.get('/categories');
        setExpenseCategories(
          response.data.filter(category => category.type === 'expense')
        );
        setEarningCategories(
          response.data.filter(category => category.type === 'earning')
        );
      } catch (error) {
        console.error(error);
      }
    }

    getCategories();
  }, []);

  const expenses = expenseCategories.map(expense => {
    return {
      label: expense.name || '',
      value: expense.slug || '',
      icon: Icons.expense[expense.slug] || '',
      id: expense.id,
      type: expense.type,
    };
  });

  const earnings = earningCategories.map(earning => {
    return {
      label: earning.name || '',
      value: earning.slug || '',
      icon: Icons.earnings[earning.slug] || '',
      id: earning.id,
      type: earning.type,
    };
  });

  return [expenses, earnings];
};

export default useCategories;
