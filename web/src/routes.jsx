import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Transactions from './pages/Transactions';
import Budgets from './pages/Budgets';
import { TransactionsProvider } from './contexts/TransactionContext';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/budgets" component={Budgets} />
      <TransactionsProvider>
        <Route exact path="/transactions" component={Transactions} />
      </TransactionsProvider>
    </Switch>
  );
};

export default Routes;
