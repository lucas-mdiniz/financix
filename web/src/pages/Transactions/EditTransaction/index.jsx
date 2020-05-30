import React from 'react';
import PropTypes from 'prop-types';
import api from '../../../services/api';
import TransactionForm from '../TransactionForm';

const EditTransaction = ({
  modalClose,
  setTransactions,
  transactions,
  currentTransaction,
}) => {
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
      } catch (error) {
        throw new Error(error);
      }
    }

    putTransaction();
  };

  return (
    <TransactionForm
      initialFormValues={initialFormValues}
      handleSubmit={handleSubmit}
    />
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
};

export default EditTransaction;
