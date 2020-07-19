import styled from 'styled-components';

const Button = styled.button`
  background: #ff8300;
  border: none;
  padding: 10px;
  color: #fff;
  font-weight: bold;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;
  display: block;
  min-width: 120px;
  font-family: Montserrat, sans-serif;

  &:hover {
    background: #da7000;
  }
`;

const CenteredButton = styled(Button)`
  margin: 0 auto;
`;
export { Button, CenteredButton };
