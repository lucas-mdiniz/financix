import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import usePie from './utils/usePie';
import {
  LegendColorBox,
  LegendTitle,
  LegendPercentage,
  LegendItem,
  PieWrapper,
} from './styles';

const Pie = ({
  data,
  outerRadius,
  innerRadius,
  width,
  height,
  legend,
  colors,
  tooltip,
  sort,
}) => {
  const graphRef = useRef(null);

  const total = data.reduce((accumulator, currentData) => ({
    value: accumulator.value + currentData.value,
  }));

  let arcs = d3.pie();

  if (sort) {
    arcs = arcs.value(value => value.value)(data);
  } else arcs = arcs.sort(null).value(value => value.value)(data);

  const pieRadius = d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  usePie(graphRef, arcs, colors, pieRadius, tooltip, total);

  return (
    <PieWrapper legend={legend}>
      <div>
        <svg width={width} height={height}>
          <g
            ref={graphRef}
            transform={`translate(${outerRadius} ${outerRadius})`}
          />
        </svg>
      </div>
      {legend && (
        <ul>
          {arcs.map(currentArc => (
            <LegendItem key={currentArc.data._id}>
              <LegendColorBox color={colors[currentArc.index]} />
              <LegendTitle>{currentArc.data.name}: </LegendTitle>
              <LegendPercentage>{currentArc.data.value}</LegendPercentage>
            </LegendItem>
          ))}
        </ul>
      )}
    </PieWrapper>
  );
};

Pie.defaultProps = {
  legend: false,
  innerRadius: 0,
  tooltip: false,
  sort: false,
};

Pie.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  outerRadius: PropTypes.number.isRequired,
  innerRadius: PropTypes.number,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  legend: PropTypes.bool,
  tooltip: PropTypes.bool,
  sort: PropTypes.bool,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Pie;
