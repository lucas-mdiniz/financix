import styled from 'styled-components';

const StyledButton = styled.button`
  background: #ff8300;
  border: none;
  padding: 10px;
  color: #fff;
  font-weight: bold;
  border-radius: 10px;
  font-size: 17px;
  cursor: pointer;
  display: block;
  min-width: 120px;

  &:hover {
    background: #f17c00;
  }
`;

export default StyledButton;
