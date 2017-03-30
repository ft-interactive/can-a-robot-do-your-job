import React, { Component } from 'react';
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from 'd3';
import throttle from 'lodash/throttle';

class ProportionalStackedBarChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // Placeholder content displayed before chart render
      chart: 'Loading chart…',
      initialDraw: true,
    };

    this.handleResize = this.handleResize.bind(this);
    this.drawChart = this.drawChart.bind(this);

    for (const mixin in ReactFauxDOM.mixins.anim) { // eslint-disable-line
      if ({}.hasOwnProperty.call(ReactFauxDOM.mixins.anim, mixin)) {
        this[mixin] = ReactFauxDOM.mixins.anim[mixin].bind(this);
      }
    }

    for (const mixin in ReactFauxDOM.mixins.core) { // eslint-disable-line
      if ({}.hasOwnProperty.call(ReactFauxDOM.mixins.core, mixin)) {
        this[mixin] = ReactFauxDOM.mixins.core[mixin].bind(this);
      }
    }
  }

  componentDidMount() {
    this.drawChart();

    // Add window resize event listener
    window.addEventListener('resize', throttle(this.handleResize, 750));
  }

  componentWillReceiveProps(nextProps) {
    this.drawChart(nextProps.data);
  }

  drawChart(inputData = this.props.data) {
    const data = inputData;

    const margin = { // Mike Bostock's margin convention
      top: 20,
      right: 20,
      bottom: 30,
      left: 0,
    };

    const width = this.node.offsetWidth - margin.left - margin.right;
    const calculatedHeight = Math.max(150, (this.node.offsetWidth / 3.2) + 14);
    const height = ((calculatedHeight - margin.top) - margin.bottom) + 14;

    const xScale = d3.scaleLinear()
        .domain([0, 1])
        .range([0, width]);

    const yScale = d3.scaleBand()
        .domain(data.map(d => d.label))
        .range([0, height]);

    const xAxis = d3.axisBottom()
        .scale(xScale)
        .ticks(10);

    const yAxis = d3.axisRight()
        .scale(yScale)
        .tickSize(0);
    //
    if (this.state.initialDraw) {
      const chart = this.connectFauxDOM('svg', 'chart');

      const svg = d3.select(chart)
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom + margin.bottom)
          .attr('role', 'graphic')
          .attr('aria-hidden', 'true')
          .attr('class', 'proportional-bar-chart');

      svg.append('g')
          .attr('class', 'y axis')
          .attr('transform', `translate(${margin.left}, ${margin.top})`)
          .call(yAxis)
        .selectAll('text')
          .attr('font-size', '16px')
          .attr('transform', `translate(0, ${(-yScale.bandwidth() / 2) - 14})`)
          .style('text-anchor', 'start');

      svg.select('.y')
        .append('text')
          .attr('class', 'label')
          .attr('x', width)
          .attr('y', -4)
          .style('text-anchor', 'end');

      svg.append('g')
          .attr('class', 'x axis')
          .attr('transform', `translate(${margin.left}, ${height + margin.top})`)
          .call(xAxis);

      const chartContainer = svg.append('g')
        .attr('class', 'chart-container')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      const bar = chartContainer.selectAll('.bar')
        .data(data)
      .enter().append('g')
        .attr('class', 'bar')
        .attr('stroke', 'white')
        .attr('stroke-width', '1')
        .attr('shape-rendering', 'crispEdges')
        .attr('transform', d => `translate(0, ${yScale(d.label)})`);

      const yesRect = bar.append('rect')
        .attr('class', 'rect')
        .attr('x', 0)
        .attr('y', d => yScale(d.label) / 4)
        .attr('width', d => xScale(d.data.yes / d.data.numJobActivities) || 0)
        .attr('height', yScale.bandwidth() / 2)
        .attr('fill', '#26747a');

      const noRect = bar.append('rect')
        .attr('class', 'rect')
        .attr('x', d => xScale(d.data.yes / d.data.numJobActivities) || 0)
        .attr('y', d => yScale(d.label) / 4)
        .attr('width', (d) => {
          return xScale(d.data.no / d.data.numJobActivities) || 0;
        })
        .attr('height', yScale.bandwidth() / 2)
        .attr('fill', '#2bbbbf');

      const sometimesRect = bar.append('rect')
        .attr('class', 'rect')
        .attr('x', d => xScale((d.data.yes + d.data.no) / d.data.numJobActivities) || 0)
        .attr('y', d => yScale(d.label) / 4)
        .attr('width', (d) => {
          return xScale(d.data.sometimes / d.data.numJobActivities) || 0;
        })
        .attr('height', yScale.bandwidth() / 2)
        .attr('fill', '#eed485');
    //
    //   rect.transition()
    //     .delay((d, i) => i * 7.5)
    //     .duration(500)
    //     .attr('y', (d) => {
    //       if (d.value < 0) {
    //         return yScale(0);
    //       }
    //       return yScale(d.value || 0);
    //     })
    //     .attr('height', (d) => {
    //       if (d.value < 0) {
    //         return yScale(d.value || 0) - yScale(0);
    //       }
    //       return yScale(0) - yScale(d.value || 0);
    //     });
    //
    //   bar.append('text')
    //     .text(d => d.value)
    //     .attr('class', 'column-chart__label')
    //     .attr('x', xScale.bandwidth() / 4)
    //     .attr('y', yScale(0) - 5)
    //     .attr('text-anchor', 'middle');
    //
      // this.setState({
      //   initialDraw: false,
      // });
    } else { // after initial draw
    //   const chart = this.connectedFauxDOM.chart;
    //   const svg = d3.select(chart)
    //     .attr('width', width + margin.left + margin.right)
    //     .attr('height', height + margin.top + margin.bottom + margin.bottom);
    //
    //   svg.select('g.y.axis')
    //       .attr('transform', `translate(${margin.left}, ${margin.top})`)
    //       .call(yAxis)
    //     .selectAll('text')
    //       .style('text-anchor', 'start');
    //
    //   // remove y-axis except origin and y-highlight values
    //   const clear = svg.selectAll('.y .tick').filter(d => !(d === 0 || d === this.props.yHighlight));
    //   clear.select('text').remove();
    //
    //   svg.select('g.x.axis')
    //       .attr('class', 'x axis')
    //       .attr('transform', `translate(${margin.left}, ${height + margin.top})`)
    //       .call(xAxis);
    //
    //   // @TODO Figure out why Mondelez doubles itself. Use hack for now.
    //   svg.selectAll('.x .tick text')
    //     .attr('y', (d) => {
    //       const secondRowNames = ['Mondelez', 'Kimberly-Clark', 'Kim.-Clark', 'Kellogg'];
    //       if (secondRowNames.indexOf(d) > -1) {
    //         return 30;
    //       }
    //       return 9;
    //       // if (i % 2 === 1) {
    //       //   return 30;
    //       // }
    //       // return 9;
    //     });
    //
    //   const chartContainer = svg.select('g.chart-container')
    //     .attr('transform', `translate(${margin.left}, ${margin.top})`);
    //
    //   // baseline
    //   chartContainer.select('line.baseline')
    //     .attr('x1', 0)
    //     .attr('x2', width)
    //     .attr('y1', yScale(0))
    //     .attr('y2', yScale(0));
    //
    //   const bar = chartContainer.selectAll('.bar')
    //     .data(data)
    //     .attr('transform', (d) => {
    //       if (width < breakpoint) {
    //         return `translate(${xScale(d.mobileCategory) + (xScale.bandwidth() / 4)}, 0)`;
    //       }
    //       return `translate(${xScale(d.category) + (xScale.bandwidth() / 4)}, 0)`;
    //     });
    //
    //   bar.select('text.column-chart__label')
    //     .text(d => d.value)
    //     .attr('x', xScale.bandwidth() / 4)
    //     .attr('y', yScale(0) - 5)
    //     .attr('text-anchor', 'middle');
    //
    //   bar.select('rect')
    //     .transition()
    //     .attr('x', 1)
    //     .attr('width', xScale.bandwidth() / 2)
    //     .attr('y', (d) => {
    //       if (d.value < 0) {
    //         return yScale(0);
    //       }
    //       return yScale(d.value || 0);
    //     })
    //     .attr('height', (d) => {
    //       if (d.value < 0) {
    //         return yScale(d.value || 0) - yScale(0);
    //       }
    //       return yScale(0) - yScale(d.value || 0);
    //     })
    //     .attr('fill', d => (d.value < 0 ? '#F19F9E' : '#A5526A'));
    //
    //   if (this.props.yHighlight) {
    //     chartContainer.select('line.yHighlight')
    //       .attr('x1', 0)
    //       .attr('x2', width)
    //       .attr('y1', yScale(this.props.yHighlight))
    //       .attr('y2', yScale(this.props.yHighlight));
    //   }
    //
    //   if (this.props.yHighlightLabel) {
    //     chartContainer.select('text.yHighlightLabel')
    //       .attr('x', width)
    //       .attr('y', yScale(this.props.yHighlight) - 5);
    //   }
    }

    this.animateFauxDOM(800);
  }

  handleResize() {
    this.drawChart();
  }

  render() {
    return (
      <div>
        <div className="renderedD3" ref={(node) => { this.node = node; }}>
          {this.state.chart}
        </div>
      </div>
    );
  }
}

ProportionalStackedBarChart.propTypes = {
  data: React.PropTypes.array,
};

export default ProportionalStackedBarChart;
