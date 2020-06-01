import styled from 'styled-components';

const DetailsTable = styled.table`
  font-size: 14px;
  color: #696969;
  border-collapse: collapse;
  width: 100%;
`;

const TableFirstCol = styled.td`
  text-align: left;
  white-space: nowrap;
`;

const TableItem = styled.td`
  padding: 10px;
  text-align: center;
  white-space: nowrap;
  color: ${props => props.color || '#696969'};
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ededed;

  &:last-child {
    border: none;
  }
`;

export { TableRow, TableItem, TableFirstCol, DetailsTable };
