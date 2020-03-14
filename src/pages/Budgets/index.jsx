import React, { useState } from 'react';
import chroma from 'chroma-js';
import AddBudgets from '../../components/AddBudgets';
import PageTitle from '../../components/PageTitle';
import { Button } from '../../components/Button';
import Modal from '../../containers/Modal';
import Card from '../../containers/Card';
import Pie from '../../components/Graphs/Pie';
import useBudgets from '../../hooks/useBudgets';

const Budgets = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const { budgets, loading } = useBudgets();

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
          innerRadius={0}
          outerRadius={150}
          data={budgets}
          legend
          colors={colors}
        />
      </Card>
      <Button onClick={handleOpenModal}>Add Budget</Button>
      <Modal open={modalOpen} onClose={handleClose}>
        <AddBudgets modalClose={handleClose} />
      </Modal>
    </>
  );
};

export default Budgets;
