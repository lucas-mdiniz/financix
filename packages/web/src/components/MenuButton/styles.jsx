import styled from 'styled-components';

const MenuButtonWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
  text-align: right;
  @media only screen and (min-width: 1025px) {
    display: none;
  }
`;

const StyledButton = styled.button`
  padding: 5px;
  border: none;
  cursor: pointer;
  height: 50px;
  width: 50px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0px 0px 20px -15px rgba(0, 0, 0, 0.35);
`;

const MenuButtonLines = styled.span`
  width: 25px;
  height: 3px;
  background: #ff8300;
  display: block;
  margin: 0 auto;

  &:not(:last-child) {
    margin-bottom: 5px;
  }
`;

export { MenuButtonWrapper, MenuButtonLines, StyledButton };
