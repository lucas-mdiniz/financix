import React, { useState, useEffect, useContext } from 'react';
import { FaCheck, FaTimes, FaMinus, FaPlus, FaTrashAlt } from 'react-icons/fa';
import PageTitle from '../../components/PageTitle';
import Card from '../../containers/Card';
import api from '../../services/api';
import {
  TransactionItem,
  TransactionStatus,
  TransactionTitle,
  TransactionValue,
  TransactionDate,
  TransactionsTotals,
  BalanceColumn,
  BalanceColumnData,
  StyledToggleButton,
  BalanceDetails,
  BalanceValue,
  PaidButton,
  DeleteButton,
} from './styles';
import { Button } from '../../components/Button';
import Modal from '../../containers/Modal';
import AddTransaction from '../../components/AddTransaction';
import { TransactionsContext } from '../../contexts/TransactionContext';
import totals from '../../backend/totals';

const Transactions = () => {
  const [transactions, setTransactions] = useContext(TransactionsContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [showBalanceDetails, setShowBalanceDetails] = useState(false);
  const [loading, setLoading] = useState(true);

  const {
    income,
    predictedIncome,
    expenses,
    predictedExpenses,
    balance,
    predictedBalance,
  } = totals(transactions);

  useEffect(() => {
    async function getTransactions() {
      try {
        const response = await api.get('/transactions');
        setTransactions(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }

    getTransactions();
  }, []);

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleDelete = id => {
    const newTransactions = transactions.filter(
      transaction => id !== transaction.id
    );

    console.log(newTransactions);
    api
      .delete(`/transactions/${id}`)
      .then(() => {
        setTransactions(newTransactions);
      })
      .catch(error => console.log(error));
  };

  const handlePaidButton = id => {
    const newTransactions = transactions.map(transaction =>
      transaction.id === id
        ? { ...transaction, paid: !transaction.paid }
        : transaction
    );

    const [newTransaction] = newTransactions.filter(
      transaction => transaction.id === id
    );

    api
      .put(`/transactions/${id}`, newTransaction)
      .then(() => {
        setTransactions(newTransactions);
      })
      .catch(error => console.log(error));
  };

  return loading ? (
    <p>Loading...</p>
  ) : (
    <>
      <PageTitle>Transactions</PageTitle>
      <Card backgroundColor="#fff" borderRadius="10px">
        <ul>
          {transactions.map(transaction => {
            return (
              <TransactionItem key={transaction.id}>
                <TransactionDate>
                  {new Date(transaction.date).toLocaleDateString()}
                </TransactionDate>
                <TransactionTitle>{transaction.title}</TransactionTitle>
                <TransactionStatus>
                  <PaidButton
                    onClick={() => {
                      handlePaidButton(transaction.id);
                    }}
                    status={transaction.paid ? 1 : 0}
                    as={transaction.paid ? FaCheck : FaTimes}
                  />
                </TransactionStatus>
                <TransactionValue>
                  {transaction.type === 'expense'
                    ? `-${transaction.amount}`
                    : transaction.amount}
                </TransactionValue>
                <DeleteButton
                  as={FaTrashAlt}
                  onClick={() => {
                    handleDelete(transaction.id);
                  }}
                />
              </TransactionItem>
            );
          })}
        </ul>
        <TransactionsTotals as="div">
          <div>
            <h3>Balance</h3>
          </div>
          <BalanceColumn>
            <BalanceColumnData>
              {showBalanceDetails && (
                <BalanceDetails>
                  <span>
                    <span>Income: </span>
                    <BalanceValue color="#08b34f">{income}</BalanceValue>
                  </span>
                  <span>
                    <span>Predicted income: </span>
                    <BalanceValue>{predictedIncome}</BalanceValue>
                  </span>
                  <span>
                    <span>Expenses: </span>
                    <BalanceValue color="#e20000">{expenses}</BalanceValue>
                  </span>
                  <span>
                    <span>Predicted expenses: </span>
                    <BalanceValue>{predictedExpenses}</BalanceValue>
                  </span>
                </BalanceDetails>
              )}
              <span>
                <span>Balance: </span>
                <BalanceValue color="#ff8300" fontWeight="bold">
                  {balance}
                </BalanceValue>
              </span>
              <span>
                <span>Predicted balance: </span>
                <BalanceValue>{predictedBalance}</BalanceValue>
              </span>
            </BalanceColumnData>
            <StyledToggleButton
              as={showBalanceDetails ? FaMinus : FaPlus}
              onClick={() => {
                setShowBalanceDetails(!showBalanceDetails);
              }}
            />
          </BalanceColumn>
        </TransactionsTotals>
      </Card>
      <Button onClick={() => setModalOpen(true)}>Add Transaction</Button>
      <Modal open={modalOpen} onClose={handleClose}>
        <AddTransaction modalClose={handleClose} />
      </Modal>
    </>
  );
};

export default Transactions;
