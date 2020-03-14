import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import 'tippy.js/dist/tippy.css';
import * as d3 from 'd3';
import tippy, { followCursor } from 'tippy.js';
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
  innerRadius = 0,
  width,
  height,
  legend = false,
  colors,
}) => {
  const graphRef = useRef(null);

  const total = data.reduce((accumulator, currentData) => ({
    value: accumulator.value + currentData.value,
  }));

  const arcs = d3
    .pie()
    .value(value => value.value)(data)
    .sort((a, b) => a.data.name.localeCompare(b.data.name));

  const arc = d3
    .arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

  useEffect(() => {
    const graphContainer = d3.select(graphRef.current);

    graphContainer
      .selectAll('path')
      .data(arcs)
      .enter()
      .append('path')
      .attr('fill', d => {
        return colors[d.index];
      })
      .attr('stroke', 'white')
      .attr('d', arc)
      .each(function creatTolltip(d) {
        const pathReference = d3.select(this)._groups[0][0];

        tippy(pathReference, {
          content: `${d.data.name}: ${(
            (d.data.value / total.value) *
            100
          ).toFixed(2)}%`,
          theme: 'light',
          arrow: false,
          followCursor: true,
          plugins: [followCursor],
        });
      });
  });

  return (
    <PieWrapper>
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
            <LegendItem key={currentArc.data.id}>
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
};

Pie.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  outerRadius: PropTypes.number.isRequired,
  innerRadius: PropTypes.number,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  legend: PropTypes.bool,
  colors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Pie;
