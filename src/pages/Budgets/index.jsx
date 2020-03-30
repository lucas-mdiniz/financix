import React, { useState } from 'react';
import chroma from 'chroma-js';
import AddBudgets from '../../components/AddBudgets';
import BudgetsList from '../../components/BudgetsList';
import PageTitle from '../../components/PageTitle';
import { Button } from '../../components/Button';
import Modal from '../../containers/Modal';
import Card from '../../containers/Card';
import Pie from '../../components/Graphs/Pie';
import useBudgets from '../../hooks/useBudgets';

const Budgets = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const { budgets, loading, setBudgets } = useBudgets();

  const handleSetBudgets = newBudget => {
    const filteredBudgets = budgets.filter(
      budget => newBudget.category.value !== budget.id
    );

    const newBudgets = [
      ...filteredBudgets,
      {
        name: newBudget.category.label,
        value: parseFloat(newBudget.amount.replace('.', '').replace(',', '.')),
        id: newBudget.category.value,
      },
    ];
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
      <PageTitle>Budgets</PageTitle>
      <Card borderRadius="10px">
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
      </Card>
      <Card borderRadius="10px">
        <BudgetsList data={budgets} />
      </Card>
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
