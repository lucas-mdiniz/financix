import styled from 'styled-components';

const DeleteButton = styled.i`
  cursor: pointer;
  min-width: 16px;
  opacity: 0;
  pointer-events: none;
  transition: 500ms;
`;

const PaidButton = styled.i`
  color: ${props => props.status && '#008000'};
  cursor: pointer;
`;

const TransactionTitles = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid #e9e9e9;
  }
`;

const TransactionItem = styled(TransactionTitles)`
  cursor: pointer;
  transition: 300ms;

  &:hover {
    background: #ff83002e;
    transition: 300ms;
    ${DeleteButton} {
      opacity: 1;
      pointer-events: all;
      transition: 300ms;
    }
  }
`;

const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TransactionCell = styled.td`
  padding: 10px;
  color: #696969;
  font-size: 15px;
  text-align: left;
  vertical-align: middle;

  &:last-child {
    width: 16px;
  }

  ${props =>
    props.deleteButton &&
    `&:hover {
      ${DeleteButton}{
        color: #e20000;
      }
    }`}

  ${props =>
    props.paidButton &&
    `&:hover {
        ${PaidButton}{
          color: #ff8300;
        }
      }`}
`;

const TransactionsTotals = styled.div`
  display: flex;
  align-items: center;
  border-top: 2px solid #e6e6e6;
  justify-content: space-between;
  padding: 20px 10px 10px 10px;
`;

const TransactionDateWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const BalanceColumn = styled.div`
  display: flex;
  align-items: center;
  min-width: 20%;
`;

const BalanceColumnData = styled.div`
  display: flex;
  flex-flow: column;
  margin-right: 15px;
  font-size: 14px;
`;

const StyledToggleButton = styled.i`
  cursor: pointer;
  color: #696969;
`;

const BalanceDetails = styled.div`
  display: flex;
  flex-flow: column;
  padding-bottom: 10px;
  border-bottom: 1px solid #e2e2e2;
  margin-bottom: 10px;
`;

const BalanceValue = styled.span`
  font-size: 16px;
  color: ${props => props.color || '#696969'};
  font-weight: ${props => props.fontWeight || '400'};
`;

const TransactionIcon = styled.span`
  margin-right: 5px;
`;

export {
  TransactionsTable,
  TransactionCell,
  TransactionTitles,
  TransactionItem,
  TransactionDateWrapper,
  TransactionsTotals,
  BalanceColumn,
  BalanceColumnData,
  StyledToggleButton,
  BalanceDetails,
  BalanceValue,
  PaidButton,
  DeleteButton,
  TransactionIcon,
};
