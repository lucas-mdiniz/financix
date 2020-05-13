import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Transactions from './pages/Transactions';
import Budgets from './pages/Budgets';
import { DateFilterProvider } from './contexts/DateFilterContext';

const Routes = () => {
  return (
    <Switch>
      <DateFilterProvider>
        <Route exact path="/" component={Home} />
        <Route exact path="/budgets" component={Budgets} />
        <Route exact path="/transactions" component={Transactions} />
      </DateFilterProvider>
    </Switch>
  );
};

export default Routes;
