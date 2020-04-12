import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import tippy from 'tippy.js';
import 'tippy.js/themes/light.css';
import { compareAsc } from 'date-fns';
import { ChartGrid, ChartHorizontalAxis, ChartContainer } from './styles';
import { format, lastDayOfWeek } from 'date-fns';

const ReportGraph = ({ width, height, data }) => {
  const graphRef = useRef(null);
  const verticalGridRef = useRef(null);
  const horizontalGridRef = useRef(null);
  const horizontalAxisRef = useRef(null);

  const sortedData = data.sort((a, b) => compareAsc(a.date, b.date));

  const sortedIncome = sortedData.filter(data => data.type === 'income');
  const sortedExpense = sortedData.filter(data => data.type === 'expense');

  useEffect(() => {
    const svg = d3.select(graphRef.current);
    const verticalGrid = d3.select(verticalGridRef.current);
    const horizontalGrid = d3.select(horizontalGridRef.current);
    const horizontalAxis = d3.select(horizontalAxisRef.current);
    const margin = { top: '20', right: '20', bottom: '20', left: '20' };
    const innerWidth = width - margin.right - margin.left;
    const innerHeight = height - margin.top - margin.bottom;

    const yValue = d => d.value;
    const xValue = d => d.name;

    /* Creates a linear scale for the Y axis */
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(sortedData, yValue)])
      .range([innerHeight, 0]);

    /* Creates a Band scale for horizontal axis */
    const xScale = d3
      .scaleBand()
      .domain(sortedData.map(xValue))
      .range([0, innerWidth])
      .padding(0.3);

    /* Creates the background vertical grid */
    verticalGrid
      .append('g')
      .call(
        d3
          .axisBottom(xScale)
          .ticks(10)
          .tickFormat('')
          .tickSize(-height)
      )
      .attr('transform', `translate(0, ${innerHeight})`)
      .style('opacity', '0.7');

    /* Add the chart horizontal axis labels */

    horizontalAxis
      .append('g')
      .call(d3.axisBottom(xScale).tickSize(0))
      .attr('transform', `translate(0, ${innerHeight})`);

    /* Creates the background horizontal grid */

    horizontalGrid.append('g').call(
      d3
        .axisLeft(yScale)
        .ticks(4)
        .tickFormat('')
        .tickSize(-width)
    );

    /* adjust text reponsivity */

    const newWidth = parseFloat(svg.style('width'));
    if (newWidth < 800) {
      const newFontSize = 14 * (width / parseInt(newWidth));
      d3.selectAll('.tick')
        .select('text')
        .style('font-size', newFontSize);
    }

    /* create the expenses bars */
    svg
      .append('g')
      .selectAll('rect')
      .data(sortedExpense, d => d.id)
      .enter()
      .append('rect')
      .attr('x', d => xScale(xValue(d)) - 1.5)
      .attr('y', d => yScale(yValue(d)))
      .attr('height', d => innerHeight - yScale(yValue(d)))
      .attr('width', xScale.bandwidth() / 2 - 1.5)
      .attr('fill', '#FF7F7F')
      .each(function(d) {
        const weekEnding = format(
          lastDayOfWeek(d.date, { weekStartsOn: 0 }),
          'dd MMM'
        );
        const pathReference = d3.select(this)._groups[0][0];
        const toolTipTemplate = `<span style="font-size: 12px; color: #696969; display: block">Expenses from ${
          d.name
        } to ${weekEnding}</span> 
                                <span style="font-size: 18px; font-weight: bold; color: #FF7F7F;" >R$ ${d.value.toFixed(
                                  2
                                )} </span>`;

        tippy(pathReference, {
          content: toolTipTemplate,
          allowHTML: true,
          arrow: false,
          theme: 'light',
        });
      });

    /* create the earnings bars */

    svg
      .append('g')
      .selectAll('rect')
      .data(sortedIncome, d => d.id)
      .enter()
      .append('rect')
      .attr('x', d => xScale(xValue(d)) + xScale.bandwidth() / 2 + 1.5)
      .attr('y', d => yScale(yValue(d)))
      .attr('height', d => innerHeight - yScale(yValue(d)))
      .attr('width', xScale.bandwidth() / 2 - 1.5)
      .attr('fill', '#5ad4ab')
      .each(function(d) {
        const weekEnding = format(
          lastDayOfWeek(d.date, { weekStartsOn: 0 }),
          'dd MMM'
        );
        const pathReference = d3.select(this)._groups[0][0];
        const toolTipTemplate = `<span style="font-size: 12px; color: #696969; display: block">Earnings from ${
          d.name
        } to ${weekEnding}</span> 
                                <span style="font-size: 18px; font-weight: bold; color: #5ad4ab;" >R$ ${d.value.toFixed(
                                  2
                                )} </span>`;

        tippy(pathReference, {
          content: toolTipTemplate,
          allowHTML: true,
          arrow: false,
          theme: 'light',
        });
      });
  });

  return (
    <ChartContainer viewBox={`0 0 ${width} ${height}`} ref={graphRef}>
      <ChartGrid ref={horizontalGridRef} />
      <ChartGrid ref={verticalGridRef} />
      <ChartHorizontalAxis ref={horizontalAxisRef} />
    </ChartContainer>
  );
};

export default ReportGraph;
