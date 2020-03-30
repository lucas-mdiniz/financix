import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const TransactionsContext = createContext([]);

export function TransactionsProvider({ children }) {
  const [transactions, setTransactions] = useState([]);

  return (
    <TransactionsContext.Provider value={[transactions, setTransactions]}>
      {children}
    </TransactionsContext.Provider>
  );
}

TransactionsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
