import React, { useState } from 'react';
import { FaCheck, FaTimes, FaMinus, FaPlus, FaTrashAlt } from 'react-icons/fa';
import Card from '../../containers/Card';
import api from '../../services/api';
import Header from '../../components/Header';
import { Button } from '../../components/Button';
import Modal from '../../containers/Modal';
import EmptyData from '../../components/EmptyData';
import AddTransaction from './AddTransaction';
import EditTransaction from './EditTransaction';
import getTotals from '../../utils/getTotals';
import Icons from '../../assets/Icons';
import useTransactions from '../../hooks/useTransactions';
import {
  TransactionTitles,
  TransactionItem,
  TransactionCell,
  TransactionDateWrapper,
  TransactionsTotals,
  BalanceColumn,
  BalanceColumnData,
  StyledToggleButton,
  BalanceDetails,
  BalanceValue,
  PaidButton,
  DeleteButton,
  TransactionsTable,
  TransactionIcon,
} from './styles';

const Transactions = () => {
  const [transactions, setTransactions, loading] = useTransactions();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState({});
  const [showBalanceDetails, setShowBalanceDetails] = useState(false);

  const {
    income,
    predictedIncome,
    expenses,
    predictedExpenses,
    balance,
    predictedBalance,
  } = getTotals(transactions);
  console.log('teste');
  const handleCloseAdd = () => {
    setAddModalOpen(false);
  };

  const handleCloseEdit = () => {
    setEditModalOpen(false);
  };

  const handleDelete = async id => {
    const newTransactions = transactions.filter(
      transaction => id !== transaction._id
    );

    try {
      await api.delete(`/transactions/${id}`);
      setTransactions(newTransactions);
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleEdit = transaction => {
    setCurrentTransaction(transaction);
    setEditModalOpen(true);
  };

  const handlePaidButton = async id => {
    const newTransactions = transactions.map(transaction =>
      transaction._id === id
        ? { ...transaction, paid: !transaction.paid }
        : transaction
    );

    const [newTransaction] = newTransactions.filter(
      transaction => transaction._id === id
    );

    try {
      await api.patch(`/transactions/${id}`, { paid: newTransaction.paid });
      setTransactions(newTransactions);
    } catch (error) {
      throw new Error(error);
    }
  };

  return loading ? (
    <p>Loading...</p>
  ) : (
    <>
      <Header>Transactions</Header>
      <Card backgroundColor="#fff" borderRadius="10px">
        {transactions.length === 0 ? (
          <EmptyData>You don&apos;t have transactions yet!</EmptyData>
        ) : (
          <>
            <TransactionsTable>
              <tbody>
                <TransactionTitles>
                  <TransactionCell as="th">Date</TransactionCell>
                  <TransactionCell as="th">Title</TransactionCell>
                  <TransactionCell as="th">Paid</TransactionCell>
                  <TransactionCell as="th">Value</TransactionCell>
                  <TransactionCell as="th" />
                </TransactionTitles>
                {transactions.map(transaction => {
                  return (
                    <TransactionItem
                      onClick={() => {
                        handleEdit(transaction);
                      }}
                      key={transaction._id}
                    >
                      <TransactionCell>
                        <TransactionDateWrapper>
                          <TransactionIcon>
                            {
                              Icons[transaction.type][
                                transaction.category.value
                              ]
                            }
                          </TransactionIcon>
                          {new Date(transaction.date).toLocaleDateString()}
                        </TransactionDateWrapper>
                      </TransactionCell>
                      <TransactionCell>{transaction.title}</TransactionCell>
                      <TransactionCell
                        onClick={e => {
                          e.stopPropagation();
                          handlePaidButton(transaction._id);
                        }}
                        paidButton
                      >
                        <PaidButton
                          status={transaction.paid ? 1 : 0}
                          as={transaction.paid ? FaCheck : FaTimes}
                        />
                      </TransactionCell>
                      <TransactionCell>
                        {transaction.type === 'expense'
                          ? `-${transaction.amount}`
                          : transaction.amount}
                      </TransactionCell>
                      <TransactionCell
                        onClick={e => {
                          e.stopPropagation();
                          handleDelete(transaction._id);
                        }}
                        deleteButton
                      >
                        <DeleteButton as={FaTrashAlt} />
                      </TransactionCell>
                    </TransactionItem>
                  );
                })}
              </tbody>
            </TransactionsTable>
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
          </>
        )}
      </Card>
      <Button onClick={() => setAddModalOpen(true)}>Add Transaction</Button>
      <Modal open={addModalOpen} onClose={handleCloseAdd}>
        <AddTransaction
          modalClose={handleCloseAdd}
          setTransactions={setTransactions}
          transactions={transactions}
        />
      </Modal>
      <Modal open={editModalOpen} onClose={handleCloseEdit}>
        <EditTransaction
          modalClose={handleCloseEdit}
          setTransactions={setTransactions}
          transactions={transactions}
          currentTransaction={currentTransaction}
        />
      </Modal>
    </>
  );
};

export default Transactions;
