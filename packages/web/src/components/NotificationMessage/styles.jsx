import styled from 'styled-components';

const StyledNotificationMessage = styled.p`
  border-radius: 15px;
  padding: 10px 20px;
  margin-top: 20px;
`;

const ErrorMessage = styled(StyledNotificationMessage)`
  color: #b20000;
  background: #ff00005e;
`;

const SuccessMessage = styled(StyledNotificationMessage)`
  color: #003f00;
  background: #98ff98;
`;

const DefaultMessage = styled(StyledNotificationMessage)`
  color: #696969;
  background: #d9d9d9;
`;

export { DefaultMessage, ErrorMessage, SuccessMessage };
