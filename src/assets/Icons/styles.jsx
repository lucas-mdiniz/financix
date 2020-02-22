import styled from 'styled-components';

const CategoryIconEarning = styled.i`
  background: #70d49a;
  color: #fff;
  border-radius: 50%;
  padding: 10px;
  text-align: center;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CategoryIconExpense = styled(CategoryIconEarning)`
  background: #d66865;
`;

export { CategoryIconEarning, CategoryIconExpense };
