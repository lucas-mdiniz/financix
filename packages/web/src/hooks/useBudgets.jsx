import { useState, useEffect } from 'react';
import axios from 'axios';
import api from '../services/api';

const useBudgets = () => {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { CancelToken } = axios;
    const source = CancelToken.source();
    let unmountController = false;

    async function getCategories() {
      try {
        const response = await api.get('/budgets');

        if (!unmountController) {
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
        }
      } catch (error) {
        throw new Error(error);
      }
    }

    getCategories();

    return () => {
      unmountController = true;
      source.cancel('cancel');
    };
  }, []);

  return { budgets, setBudgets, loading };
};

export default useBudgets;
