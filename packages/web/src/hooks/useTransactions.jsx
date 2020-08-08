import { useState, useEffect, useContext } from 'react';
import { startOfMonth, endOfMonth } from 'date-fns';
import axios from 'axios';
import api from '../services/api';
import { DateFilter } from '../contexts/DateFilterContext';

const useTransactions = paid => {
  const [selectedDate] = useContext(DateFilter);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const initialDate = startOfMonth(selectedDate).toISOString();
  const finalDate = endOfMonth(selectedDate).toISOString();

  useEffect(() => {
    const { CancelToken } = axios;
    const source = CancelToken.source();
    let unmountController = false;

    async function getTransactions() {
      setLoading(true);
      try {
        const response = await api.get(
          `/transactions/?initialDate=${initialDate}&finalDate=${finalDate}${
            paid ? `&paid=${paid}` : ''
          }`,
          { cancelToken: source.token }
        );
        if (!unmountController) {
          setTransactions(response.data);
          setLoading(false);
        }
      } catch (error) {
        if (error.message !== 'cancel') throw new Error(error);
      }
    }

    getTransactions();

    return () => {
      unmountController = true;
      source.cancel('cancel');
    };
  }, [initialDate, finalDate, paid]);

  return [transactions, setTransactions, loading];
};

export default useTransactions;
