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
        setExpenseCategories(response.data.expense);
        setEarningCategories(response.data.earning);
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
    };
  });

  const earnings = earningCategories.map(earning => {
    return {
      label: earning.name || '',
      value: earning.slug || '',
      icon: Icons.earnings[earning.slug] || '',
    };
  });

  return [expenses, earnings];
};

export default useCategories;
