import styled from 'styled-components';

const StyledMain = styled.main`
  background: #e2e2e2;
  flex-grow: 1;
  padding: 30px;
  max-width: 100%;

  @media only screen and (max-width: 1024px) {
    padding: 15px;
  }
`;

export default StyledMain;
