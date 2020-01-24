import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Transactions from './pages/Transactions';

const Routes = () => {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/transactions" component={Transactions} />
        </Switch>
    );
};

export default Routes;
