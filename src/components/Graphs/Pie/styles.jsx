import styled from 'styled-components';

const PieWrapper = styled.div`
  ${props => props.legend && 'display: grid;'}
  grid-template-columns: repeat(auto-fit, minmax(300px, auto));
  align-items: center;
  justify-content: center;
  grid-gap: 50px;
`;

const LegendColorBox = styled.span`
  width: 10px;
  height: 10px;
  display: inline-block;
  margin-right: 5px;
  border-radius: 100%;
  background: ${props => props.color};
`;

const LegendTitle = styled.span`
  font-weight: bold;
  font-size: 15px;
`;

const LegendPercentage = styled.span`
  font-size: 15px;
`;

const LegendItem = styled.li`
  margin: 3px 0;
`;

export {
  LegendColorBox,
  LegendTitle,
  LegendPercentage,
  LegendItem,
  PieWrapper,
};
