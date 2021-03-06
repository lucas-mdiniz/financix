import styled from 'styled-components';

const ChartGrid = styled.g`
  path {
    stroke-width: 0;
  }

  .tick {
    color: #e0e0e0;
  }
`;

const ChartHorizontalAxis = styled.g`
  transform: translateY(7px);

  path {
    stroke-width: 0;
  }

  .tick {
    color: #696969;
    font-size: 13px;
  }
`;

const ChartContainer = styled.g`
  max-width: 1024px;
  display: block;
  margin: 0 auto;
`;

const StyledSvg = styled.svg`
  min-width: 600px;
`;

export { ChartGrid, ChartHorizontalAxis, ChartContainer, StyledSvg };
