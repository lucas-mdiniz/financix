import { useState, useEffect } from 'react';
import api from '../services/api';

const useBudgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await api.get('/budgets');
        const budgetsData = response.data;

        const filteredBudgets = budgetsData
          .filter(budget => budget.type === 'expense' && budget.amount > 0)
          .map(budget => {
            const filteredBudget = budget;
            filteredBudget.value = budget.amount;
            delete filteredBudget.amount;
            return filteredBudget;
          });

        setBudgets(filteredBudgets);
        setLoading(false);
      } catch (error) {
        throw new Error(error);
      }
    }

    getCategories();
  }, []);

  return { budgets, setBudgets, loading };
};

export default useBudgets;
