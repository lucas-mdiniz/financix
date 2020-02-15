import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Transactions from './pages/Transactions';
import { TransactionsProvider } from './contexts/TransactionContext';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <TransactionsProvider>
        <Route path="/transactions" component={Transactions} />
      </TransactionsProvider>
    </Switch>
  );
};

export default Routes;
