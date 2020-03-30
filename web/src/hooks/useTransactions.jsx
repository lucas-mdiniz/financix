import { useState, useEffect } from 'react';
import api from '../services/api';

const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getTransactions() {
      try {
        const response = await api.get('/transactions');
        setTransactions(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getTransactions();
  }, []);

  return [transactions, loading];
};

export default useTransactions;
