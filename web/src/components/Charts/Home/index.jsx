import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import tippy from 'tippy.js';
import 'tippy.js/themes/light.css';
import { ChartGrid, ChartHorizontalAxis, ChartContainer } from './styles';
import { format, lastDayOfWeek } from 'date-fns';

const ReportChart = ({ width, height, data }) => {
  const graphRef = useRef(null);
  const verticalGridRef = useRef(null);
  const horizontalGridRef = useRef(null);
  const horizontalAxisRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(graphRef.current);
    const verticalGrid = d3.select(verticalGridRef.current);
    const horizontalGrid = d3.select(horizontalGridRef.current);
    const horizontalAxis = d3.select(horizontalAxisRef.current);
    const margin = { top: '20', right: '20', bottom: '20', left: '20' };
    const innerWidth = width - margin.right - margin.left;
    const innerHeight = height - margin.top - margin.bottom;

    const xValue = d => d.name;
    svg.selectAll('*').remove();
    verticalGrid.selectAll('*').remove();
    horizontalGrid.selectAll('*').remove();
    horizontalAxis.selectAll('*').remove();
    /* Creates a linear scale for the Y axis */

    const yScale = d3
      .scaleLinear()
      .domain([
        Math.min(
          0,
          d3.min(data, d => d.balance),
          d3.min(data, d => Math.min(d.expense, d.earning))
        ),
        Math.max(
          d3.max(data, d => Math.max(d.expense, d.earning)),
          d3.max(data, d => d.balance)
        ),
      ])
      .range([innerHeight, 0]);

    /* Creates a Band scale for horizontal axis */
    const xScale = d3
      .scaleBand()
      .domain(data.map(xValue))
      .range([0, innerWidth])
      .padding(0.3);

    // custom invert function
    xScale.invert = (() => {
      const domain = xScale.domain();
      const range = xScale.range();
      const scale = d3
        .scaleQuantize()
        .domain(range)
        .range(domain);

      return function(x) {
        return scale(x);
      };
    })();

    /* Creates the background vertical grid */
    verticalGrid
      .append('g')
      .call(
        d3
          .axisBottom(xScale)
          .ticks(10)
          .tickFormat('')
          .tickSize(-innerHeight)
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
        .ticks(8)
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

    /* create the line for the balance chart */
    var line = d3
      .line()
      .x(d => xScale(xValue(d)) + xScale.bandwidth() / 2 - 0.75)
      .y(d => yScale(d.balance))
      .curve(d3.curveMonotoneX);

    /* create the area for the balance chart */
    const area = d3
      .area()
      .x(d => xScale(xValue(d)) + xScale.bandwidth() / 2 - 0.75)
      .y1(d => yScale(d.balance))
      .y0(yScale(0))
      .curve(d3.curveMonotoneX);

    const lineAreaChart = svg.append('g');
    const barChart = svg.append('g');

    const bullet = lineAreaChart
      .append('circle')
      .attr('fill', '#5ad4ab')
      .attr('r', 5)
      .style('visibility', 'hidden');

    lineAreaChart
      .append('path')
      .attr('stroke', '#5ad4ab')
      .attr('fill', 'none')
      .attr('d', line(data));

    lineAreaChart
      .append('path')
      .attr('fill', 'rgba(90, 212, 171, 0.1)')
      .attr('d', area(data))
      .call(function(d) {
        const pathReference = d._groups[0][0];

        const tippyInstance = tippy(pathReference, {
          arrow: false,
          allowHTML: true,
          theme: 'light',
        });

        const mousemove = () => {
          const x0 = xScale.invert(d3.mouse(pathReference)[0]);
          const trackedDateIndex = xAxisDomain.indexOf(x0);
          const d = data[trackedDateIndex];
          const tooltipX = xScale(d.name) + xScale.bandwidth() / 2;
          const tooltipY = yScale(d.balance);

          bullet
            .attr('transform', `translate(${tooltipX}, ${tooltipY})`)
            .style('visibility', 'visible');

          const balanceTooltipContent = `
            <span style="font-size: 12px; color: #696969; display: block">
              Balance of ${d.name}
            </span> 
            <span style="font-size: 18px; font-weight: bold; color: ${
              d.balance < 0 ? '#FF7F7F' : '#5ad4ab'
            };">
              R$ ${d.balance.toFixed(2)} 
            </span>
          `;

          tippyInstance.setProps({
            getReferenceClientRect() {
              const rect = bullet._groups[0][0].getBoundingClientRect();
              return {
                width: 5,
                height: 5,
                left: rect.x,
                top: rect.y,
              };
            },
            content: balanceTooltipContent,
          });
        };

        const mouseout = () => {
          bullet.style('visibility', 'hidden');
        };

        d.on('mousemove', mousemove).on('mouseout', mouseout);

        const xAxisDomain = data.map(d => d.name);
      });

    /* create the expenses bars */
    barChart
      .append('g')
      .selectAll('rect')
      .data(data, d => d._id)
      .enter()
      .append('rect')
      .attr('x', d => xScale(xValue(d)) - 1.5)
      .attr('y', d => yScale(d.expense))
      .attr('height', d => yScale(0) - yScale(d.expense))
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
                                <span style="font-size: 18px; font-weight: bold; color: #FF7F7F;" >R$ ${d.expense.toFixed(
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

    barChart
      .append('g')
      .selectAll('rect')
      .data(data, d => d._id)
      .enter()
      .append('rect')
      .attr('x', d => xScale(xValue(d)) + xScale.bandwidth() / 2 + 1.5)
      .attr('y', d => yScale(d.earning))
      .attr('height', d => yScale(0) - yScale(d.earning))
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
                                <span style="font-size: 18px; font-weight: bold; color: #5ad4ab;" >R$ ${d.earning.toFixed(
                                  2
                                )} </span>`;

        tippy(pathReference, {
          content: toolTipTemplate,
          allowHTML: true,
          arrow: false,
          theme: 'light',
        });
      });
  }, [data, width, height]);

  return (
    <svg viewBox={`0 0 ${width} ${height}`}>
      <g>
        <ChartGrid ref={horizontalGridRef} />
        <ChartGrid ref={verticalGridRef} />
        <ChartHorizontalAxis ref={horizontalAxisRef} />
      </g>
      <ChartContainer ref={graphRef} />
    </svg>
  );
};

export default ReportChart;
