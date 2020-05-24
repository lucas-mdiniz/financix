import { useEffect } from 'react';
import 'tippy.js/dist/tippy.css';
import * as d3 from 'd3';
import tippy, { followCursor } from 'tippy.js';

const usePie = (graphRef, arcs, colors, pieRadius, tooltip, total) => {
  useEffect(() => {
    const graphContainer = d3.select(graphRef.current);

    const arc = graphContainer.selectAll('path').data(arcs, d => d.data._id);

    arc.join(
      enter => {
        const pieToRender = enter
          .append('path')
          .attr('fill', d => {
            return colors[d.index];
          })
          .attr('d', pieRadius);

        if (tooltip) {
          return pieToRender.each(function creatTolltip(d) {
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
        }
        return pieToRender;
      },
      update => {
        const pieToRender = update
          .transition()
          .duration(750)
          .attr('fill', d => {
            return colors[d.index];
          })
          .attrTween('d', function arcTween(a) {
            // eslint-disable-next-line no-underscore-dangle
            const i = d3.interpolate(this._current, a);
            // eslint-disable-next-line no-underscore-dangle
            this._current = i(0);

            return t => pieRadius(i(t));
          });

        if (tooltip) {
          pieToRender.each(function updateTolltip(d) {
            // eslint-disable-next-line no-underscore-dangle
            const tippyInstance = d3.select(this)._groups[0][0]._tippy;

            tippyInstance.setContent(
              `${d.data.name}: ${((d.data.value / total.value) * 100).toFixed(
                2
              )}%`
            );
          });
        }

        return pieToRender;
      }
    );
  }, [graphRef, pieRadius, arcs, colors, total.value, tooltip]);
};

export default usePie;
