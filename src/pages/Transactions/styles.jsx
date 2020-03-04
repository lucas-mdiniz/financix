import styled from 'styled-components';

const DeleteButton = styled.i`
  cursor: pointer;
  min-width: 16px;
  position: absolute;
  right: 0;
  opacity: 0;
  pointer-events: none;
  transition: 500ms;

  &:hover {
    color: #e20000;
  }
`;

const TransactionItem = styled.li`
  position: relative;
  margin: 0 10px;
  padding: 10px 0;
  border-bottom: 1px solid #f1f1f1;
  display: flex;
  align-items: center;
  &:last-child {
    border-bottom: none;
  }

  &:hover {
    ${DeleteButton} {
      opacity: 1;
      pointer-events: all;
      transition: 300ms;
    }
  }
`;

const TransactionDate = styled.span`
  min-width: 100px;
  display: inline-block;
  width: 20%;
  padding: 0 5px;
`;

const TransactionTitle = styled.span`
  display: inline-block;
  width: 50%;
  min-width: 200px;
  padding: 0 5px;
`;

const TransactionStatus = styled.i`
  width: 10%;
  display: inline-block;
  min-width: 20px;
  padding: 0 5px;
`;

const TransactionValue = styled.span`
  width: 20%;
  display: inline-block;
  min-width: 100px;
  padding: 0 5px;
`;

const TransactionsTotals = styled(TransactionItem)`
  border-top: 2px solid #e6e6e6;
  justify-content: space-between;
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

const PaidButton = styled.i`
  color: ${props => props.status && '#008000'};
  cursor: pointer;
`;

export {
  TransactionItem,
  TransactionDate,
  TransactionTitle,
  TransactionStatus,
  TransactionValue,
  TransactionsTotals,
  BalanceColumn,
  BalanceColumnData,
  StyledToggleButton,
  BalanceDetails,
  BalanceValue,
  PaidButton,
  DeleteButton,
};
