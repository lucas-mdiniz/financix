import React, { useState } from 'react';
import PropTypes from 'prop-types';
import uuidv4 from 'uuid';
import api from '../../../services/api';
import TransactionForm from '../TransactionForm';
import NotificationMessage from '../../../components/NotificationMessage';

const AddTransaction = ({
  modalClose,
  setTransactions,
  transactions,
  setLoading,
}) => {
  const [error, setError] = useState(false);
  const initialFormValues = {
    amount: '',
    title: '',
    description: '',
    date: new Date(),
    paid: false,
    type: 'expense',
    category: null,
  };

  const handleSubmit = (values, { resetForm }) => {
    setLoading(true);
    setError(false);
    const amount = values.amount.replace('.', '').replace(',', '.');

    const newTransaction = {
      ...values,
      amount,
      category: { value: values.category.value, label: values.category.label },
      id: uuidv4(),
      date: values.date.toUTCString(),
    };

    async function postTransaction() {
      try {
        const response = await api.post('/transactions', newTransaction);

        setTransactions([...transactions, response.data]);
        resetForm();
        modalClose();
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    postTransaction();
  };

  return (
    <>
      <TransactionForm
        initialFormValues={initialFormValues}
        handleSubmit={handleSubmit}
      />
      {error && (
        <NotificationMessage type="error">
          Something went wront, try again later.
        </NotificationMessage>
      )}
    </>
  );
};

AddTransaction.propTypes = {
  modalClose: PropTypes.func.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
  setTransactions: PropTypes.func.isRequired,
};

export default AddTransaction;
