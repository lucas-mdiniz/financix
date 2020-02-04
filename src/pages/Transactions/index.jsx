import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import PageTitle from '../../components/PageTitle';
import Card from '../../containers/Card';
import api from '../../services/api';
import {
  TransactionItem,
  TransactionStatus,
  TransactionTitle,
  TransactionValue,
  TransactionDate,
} from './styles';
import Button from '../../components/Button';
import Modal from '../../containers/Modal';
import AddTransaction from '../../components/AddTransaction';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    async function getTransactions() {
      try {
        const response = await api.get('/transactions');
        setTransactions(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    getTransactions();
  }, []);

  const handleClose = e => {
    if (e.target === e.currentTarget) {
      setModalOpen(false);
    }
  };

  return (
    <>
      <PageTitle>Transactions</PageTitle>
      <Card backgroundColor="#fff" borderRadius="10px">
        <ul>
          {transactions.map(transaction => {
            return (
              <TransactionItem key={transaction.id}>
                <TransactionDate>{transaction.date}</TransactionDate>
                <TransactionTitle>{transaction.title}</TransactionTitle>
                <TransactionStatus status={transaction.paid}>
                  {transaction.paid ? <FaCheck /> : <FaTimes />}
                </TransactionStatus>
                <TransactionValue>{transaction.amount}</TransactionValue>
              </TransactionItem>
            );
          })}
        </ul>
      </Card>
      <Button onClick={() => setModalOpen(true)}>Add Transaction</Button>
      <Modal open={modalOpen} onClose={handleClose}>
        <AddTransaction />
      </Modal>
    </>
  );
};

export default Transactions;
