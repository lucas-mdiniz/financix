import styled from 'styled-components';

const TransactionItem = styled.li`
  margin: 0 10px;
  padding: 10px 0;
  border-bottom: 1px solid #f1f1f1;
  display: flex;
  align-items: center;
  &:last-child {
    border-bottom: none;
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
  color: ${props => props.status && '#008000'};
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

export {
  TransactionItem,
  TransactionDate,
  TransactionTitle,
  TransactionStatus,
  TransactionValue,
};
