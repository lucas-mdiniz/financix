import { useState, useEffect } from 'react';
import api from '../services/api';

const useBudgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    });
  }, []);

  return { budgets, setBudgets, loading };
};

export default useBudgets;
