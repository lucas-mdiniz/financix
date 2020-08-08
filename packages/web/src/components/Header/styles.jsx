import styled from 'styled-components';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 767px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const StyledMonthSelector = styled.div`
  #selectedMonth {
    width: 200px;
    margin: 0 auto;
  }

  @media only screen and (max-width: 767px) {
    width: 100%;
  }
`;

export { HeaderWrapper, StyledMonthSelector };
