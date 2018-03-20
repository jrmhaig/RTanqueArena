import React from "react"
import PropTypes from "prop-types"

export default class Arena extends React.Component {
  state = {
    width: 1200,
    height: 700,
    border: 15.0,
    ratio: 500 / 500,
    //ratio: this.props.arenaHeight / this.props.arenaWidth,
    scale: d3.scaleLinear()
              //.domain([-15, this.props.arenaWidth + 15])
              .domain([-15, 500 + 15])
              .range([0, 1200])
  };

  componentDidMount() {
    this.battle();
  }

  battle = () => {
    const node = this.node;
    var line = this.props.getFrame();
    var self = this;

    var svg = d3.select(node);
    var shells = svg.selectAll("circle.shell").data(line["shells"]);

    // self.state is not yet defined
    shells
      .attr("cx", function(d) { return self.state.scale(d.x); })
      .attr("cy", function(d) { return self.state.scale(d.y); });

    shells.enter()
      .append("circle")
      .classed("shell", true)
      .attr("r", 2)
      .attr("fill", "black")
      .attr("cx", function(d) { return self.state.scale(d.x); })
      .attr("cy", function(d) { return self.state.scale(d.y); });

    shells.exit().remove();

    setTimeout(this.battle, 500);
  }

  render() {
    return (
      <React.Fragment>
        <div ref={input => this.bound = input} >
          <svg ref={node => this.node = node}
            width={500} height={500} style={{"backgroundColor": "#cccccc"}} />
        </div>
      </React.Fragment>
    );
  }
}
