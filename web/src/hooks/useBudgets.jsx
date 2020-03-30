import { useState, useEffect } from 'react';
import api from '../services/api';

const useBudgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await api.get('/categories');
        const budgetsData = response.data
          .filter(category => category.type === 'expense' && category.amount)
          .map(budget => {
            return {
              name: budget.name,
              value: parseFloat(budget.amount),
              id: budget.slug,
            };
          });
        setBudgets(budgetsData);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getCategories();
  }, []);

  return { budgets, setBudgets, loading };
};

export default useBudgets;
