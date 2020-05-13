import React, { useState } from 'react';
import chroma from 'chroma-js';
import Header from '../../components/Header';
import AddBudgets from '../../components/AddBudgets';
import BudgetsList from '../../components/BudgetsList';
import { Button } from '../../components/Button';
import Modal from '../../containers/Modal';
import Card from '../../containers/Card';
import Pie from '../../components/Charts/Pie';
import useBudgets from '../../hooks/useBudgets';
import EmptyData from '../../components/EmptyData';
import useTransactions from '../../hooks/useTransactions';
import { CardTitle } from '../../containers/Card/styles';

const Budgets = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { budgets, loading, setBudgets } = useBudgets();
  const [transactions, , loadingTransactions] = useTransactions(true);

  const handleSetBudgets = newBudget => {
    const filteredBudgets = budgets.filter(
      budget => newBudget._id !== budget._id
    );

    const newBudgets = [...filteredBudgets, newBudget];
    setBudgets(newBudgets);
  };
  const colors = chroma
    .scale(['#007bff', '#9c6cf3', '#dd5ad8', '#ff6760', '#ff8738', '#ffa600'])
    .mode('lch')
    .colors(budgets.length);

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  return loading ? (
    <p>Loading ...</p>
  ) : (
    <>
      <Header>Budgets</Header>
      <Card borderRadius="10px">
        {budgets.length === 0 ? (
          <EmptyData>You don't have any budget yet!</EmptyData>
        ) : (
          <Pie
            width={300}
            height={300}
            innerRadius={50}
            outerRadius={150}
            data={budgets}
            legend
            tooltip
            sort
            colors={colors}
          />
        )}
      </Card>
      {!loadingTransactions && (
        <Card borderRadius="10px">
          <CardTitle>Details</CardTitle>
          <BudgetsList budgets={budgets} transactions={transactions} />
        </Card>
      )}
      <Button onClick={handleOpenModal}>Add Budget</Button>
      <Modal open={modalOpen} onClose={handleClose}>
        <AddBudgets
          modalClose={handleClose}
          handleSetBudgets={handleSetBudgets}
        />
      </Modal>
    </>
  );
};

export default Budgets;
