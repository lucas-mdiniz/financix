import React, { useState } from 'react';
import chroma from 'chroma-js';
import { Pie, Tooltip, Cell, Legend } from 'recharts';
import AddBudgets from '../../components/AddBudgets';
import PageTitle from '../../components/PageTitle';
import { Button } from '../../components/Button';
import Modal from '../../containers/Modal';
import Card from '../../containers/Card';
import {
  LegendColorBox,
  LegendTitle,
  LegendPercentage,
  LegendItem,
  StyledPieChart,
} from './styles';
import useBudgets from '../../hooks/useBudgets';

const Budgets = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const [budgets] = useBudgets();

  const colors = chroma
    .scale(['#2A2F30', '#585957', '#A2AB9A', '#C9C6A9', '#CFB78A'])
    .colors(budgets.length);

  const renderLegend = props => {
    const { payload } = props;

    return (
      <ul>
        {payload.map(entry => (
          <LegendItem key={`item-${entry.payload.id}`}>
            <LegendColorBox color={entry.color} />
            <LegendTitle>{entry.value}: </LegendTitle>
            <LegendPercentage>
              {(entry.payload.percent * 100).toFixed(2)}%
            </LegendPercentage>
          </LegendItem>
        ))}
      </ul>
    );
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  return (
    <>
      <PageTitle>Budgets</PageTitle>
      <Card borderRadius="10px">
        <StyledPieChart width={400} height={400}>
          <Pie
            data={budgets}
            dataKey="value"
            cx={200}
            cy={200}
            labelLine={false}
            outerRadius={150}
            innerRadius={50}
            fill="#8884d8"
          >
            {budgets.map((entry, index) => (
              <Cell key={entry.name} fill={colors[index]} />
            ))}
          </Pie>
          <Tooltip />7
          <Legend
            content={renderLegend}
            wrapperStyle={{ position: 'relative' }}
          />
        </StyledPieChart>
      </Card>
      <Button onClick={handleOpenModal}>Add Budget</Button>
      <Modal open={modalOpen} onClose={handleClose}>
        <AddBudgets modalClose={handleClose} />
      </Modal>
    </>
  );
};

export default Budgets;
