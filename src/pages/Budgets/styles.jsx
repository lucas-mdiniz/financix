import styled from 'styled-components';
import { PieChart } from 'recharts';

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

const StyledPieChart = styled(PieChart)`
  display: flex;
  align-items: center;
  width: auto !important;
  height: auto !important;
  flex-wrap: wrap;
  justify-content: center;
`;

export {
  LegendColorBox,
  LegendTitle,
  LegendPercentage,
  LegendItem,
  StyledPieChart,
};
