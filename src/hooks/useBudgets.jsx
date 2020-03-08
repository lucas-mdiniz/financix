import { useState, useEffect } from 'react';
import api from '../services/api';

const useBudgets = () => {
  const [budgets, setBudgets] = useState([]);

  useEffect(() => {
    api.get('/categories').then(response => {
      const budgetsData = response.data
        .filter(category => category.type === 'expense' && category.amount)
        .map(budget => {
          return {
            name: budget.name,
            value: parseFloat(budget.amount),
            id: budget.id,
          };
        });

      setBudgets(budgetsData);
    });
  }, []);

  return [budgets, setBudgets];
};

export default useBudgets;
