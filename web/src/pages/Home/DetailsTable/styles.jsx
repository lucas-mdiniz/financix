import styled from 'styled-components';

const DetailsTable = styled.table`
  font-size: 14px;
  width: 100%;
  color: #696969;
  border-collapse: collapse;
`;

const TableFirstCol = styled.td`
  text-align: left;
`;

const TableItem = styled.td`
  padding: 10px;
  text-align: center;
  color: ${props => props.color || '#696969'};
`;

const TableRow = styled.tr`
  border-bottom: 1px solid #ededed;

  &:last-child {
    border: none;
  }
`;

export { TableRow, TableItem, TableFirstCol, DetailsTable };
