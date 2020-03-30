import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const ReportGraph = ({ width, height, data }) => {
  const graphRef = useRef(null);

  useEffect(() => {
    const g = d3.select(graphRef.current);
    const margin = { top: '20', right: '20', bottom: '20', left: '20' };
    const innerWidth = width - margin.right - margin.left;
    const innerHeight = height - margin.top - margin.bottom;

    const yValue = d => d.value;
    const xValue = d => d.name;

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, yValue)])
      .range([0, innerHeight]);

    const xScale = d3
      .scaleBand()
      .domain(data.map(xValue))
      .range([0, innerWidth])
      .padding(0.1);

    g.append('g')
      .call(d3.axisBottom(xScale))
      .attr('transform', `translate(0, ${innerHeight})`);

    g.attr('transform', `translate(${margin.left}, ${margin.bottom})`);

    g.selectAll('rect')
      .data(data, d => d.id)
      .enter()
      .append('rect')
      .attr('x', d => xScale(xValue(d)))
      .attr('y', d => innerHeight - yScale(yValue(d)))
      .attr('height', d => yScale(yValue(d)))
      .attr('width', xScale.bandwidth())
      .attr('fill', d => (d.type === 'expense' ? '#FF7F7F' : '#5AD4AB'));
  });

  return (
    <svg height={height} width={width}>
      <g ref={graphRef} />
    </svg>
  );
};

export default ReportGraph;
