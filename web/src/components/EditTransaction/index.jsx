import React from 'react';
import api from '../../services/api';
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
    let amount =
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
        modalClose();
        resetForm();
      } catch (error) {
        console.log(error);
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

export default EditTransaction;
