import React, { useState } from 'react';
import PropTypes from 'prop-types';
import api from '../../../services/api';
import TransactionForm from '../TransactionForm';
import NotificationMessage from '../../../components/NotificationMessage';

const EditTransaction = ({
  modalClose,
  setTransactions,
  transactions,
  currentTransaction,
  setLoading,
}) => {
  const [error, setError] = useState(false);

  const initialFormValues = {
    amount: currentTransaction.amount.toString(),
    title: currentTransaction.title,
    description: currentTransaction.description,
    date: currentTransaction.date
      ? new Date(currentTransaction.date)
      : new Date(),
    paid: currentTransaction.paid,
    type: currentTransaction.type,
    category: currentTransaction.category,
  };

  const handleSubmit = (values, { resetForm }) => {
    setError(false);
    setLoading(true);
    const amount =
      values.amount.replace('.', '').replace(',', '.') || values.amount;

    const editTransaction = {
      ...values,
      amount,
      date: values.date.toUTCString(),
    };

    async function putTransaction() {
      try {
        const response = await api.put(
          `/transactions/${currentTransaction._id}`,
          editTransaction
        );

        const filteredTransactions = transactions.map(transaction =>
          transaction._id === currentTransaction._id
            ? response.data
            : transaction
        );

        setTransactions(filteredTransactions);
        resetForm();
        modalClose();
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    putTransaction();
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

EditTransaction.propTypes = {
  modalClose: PropTypes.func.isRequired,
  currentTransaction: PropTypes.shape({
    amount: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.string,
    paid: PropTypes.bool,
    type: PropTypes.string,
    category: PropTypes.objectOf(PropTypes.string),
    _id: PropTypes.string,
  }).isRequired,
  transactions: PropTypes.arrayOf(PropTypes.object).isRequired,
  setTransactions: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};

export default EditTransaction;
