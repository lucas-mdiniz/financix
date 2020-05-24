import { useState, useEffect, useContext } from 'react';
import { startOfMonth, endOfMonth } from 'date-fns';
import api from '../services/api';
import { DateFilter } from '../contexts/DateFilterContext';

const useTransactions = paid => {
  const [selectedDate] = useContext(DateFilter);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const initialDate = startOfMonth(selectedDate).toISOString();
  const finalDate = endOfMonth(selectedDate).toISOString();

  useEffect(() => {
    async function getTransactions() {
      try {
        const response = await api.get(
          `/transactions/?initialDate=${initialDate}&finalDate=${finalDate}${
            paid ? `&paid=${paid}` : ''
          }`
        );
        setTransactions(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getTransactions();
  }, [initialDate, finalDate, paid]);

  return [transactions, setTransactions, loading];
};

export default useTransactions;
