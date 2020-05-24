import React from 'react';
import PropTypes from 'prop-types';
import { lastDayOfWeek, format } from 'date-fns';
import { DetailsTable, TableFirstCol, TableItem, TableRow } from './styles';
import { CardTitle } from '../../../containers/Card/styles';
import Card from '../../../containers/Card';

const ReportDetails = ({ filteredTransactions }) => {
  return (
    <Card borderRadius="10px" horizontalMargin="15px" padding="30px">
      <CardTitle>Details</CardTitle>
      <DetailsTable>
        <thead>
          <TableRow>
            <TableFirstCol as="th">period</TableFirstCol>
            <TableItem as="th">earnings</TableItem>
            <TableItem as="th">expenses</TableItem>
            <TableItem as="th">results</TableItem>
            <TableItem as="th">balance</TableItem>
          </TableRow>
        </thead>
        <tbody>
          {filteredTransactions.map(transaction => {
            const weekEnding = format(
              lastDayOfWeek(transaction.date, { weekStartsOn: 0 }),
              'dd MMM'
            );

            return (
              <TableRow key={transaction._id}>
                <TableFirstCol>
                  {transaction.name} to {weekEnding}
                </TableFirstCol>
                <TableItem
                  color={transaction.earning < 0 ? '#ff7f7f' : '#5ad4ab'}
                >
                  R$ {transaction.earning.toFixed(2)}
                </TableItem>
                <TableItem color="#ff7f7f">
                  R$ -{transaction.expense.toFixed(2)}
                </TableItem>
                <TableItem
                  color={
                    transaction.earning - transaction.expense < 0
                      ? '#ff7f7f'
                      : '#5ad4ab'
                  }
                >
                  R$ {(transaction.earning - transaction.expense).toFixed(2)}
                </TableItem>
                <TableItem
                  color={transaction.balance < 0 ? '#ff7f7f' : '#5ad4ab'}
                >
                  R$ {transaction.balance.toFixed(2)}
                </TableItem>
              </TableRow>
            );
          })}
        </tbody>
      </DetailsTable>
    </Card>
  );
};

ReportDetails.propTypes = {
  filteredTransactions: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ReportDetails;
