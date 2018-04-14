import React from "react"
import PropTypes from "prop-types"

export default class Arena extends React.Component {
  state = {
    width: 1200,
    height: 700,
    ratio: this.props.arenaHeight / this.props.arenaWidth,
    scale: d3.scaleLinear()
              .domain([0, this.props.arenaWidth])
              .range([0, 1200])
  };

  componentDidMount() {
    this.battle();
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions = () => {
    this.setState({
      width: this.bound.offsetWidth,
      height: this.state.ratio * this.bound.offsetWidth,
      scale: d3.scaleLinear()
                .domain([0, this.props.arenaWidth])
                .range([0, this.bound.offsetWidth])
    });
  }

  battle = () => {
    const node = this.node;
    var line = this.props.getFrame();
    var self = this;

    var svg = d3.select(node);
    var shells = svg.selectAll("circle.shell").data(line["shells"]);
    var bodies = svg.selectAll("image.body").data(line["bots"]);
    var turrets = svg.selectAll("image.turret").data(line["bots"]);
    var radars = svg.selectAll("image.radar").data(line["bots"]);
    var names = svg.selectAll("text").data(line["bots"]);
    var healths = svg.selectAll("rect").data(line["bots"]);
    var explosions = svg.selectAll("image.explosion").data(line["explosions"]);
    var botMarkers = svg.selectAll("circle.botMarker").data(line["bots"]);

    botMarkers
      .attr("r", function(d) { return self.state.scale(30); })
      .attr("fill", "green")
      .attr("cx", function(d) { return self.state.scale(d.x); })
      .attr("cy", function(d) { return self.state.scale(d.y); });
    botMarkers.enter()
      .append("circle")
      .classed("botMarker", true)
      .attr("cx", function(d) { return self.state.scale(d.x); })
      .attr("cy", function(d) { return self.state.scale(d.y); });
    botMarkers.exit().remove();

    shells
      .attr("r", self.state.scale(5))
      .attr("cx", function(d) { return self.state.scale(d.x); })
      .attr("cy", function(d) { return self.state.scale(d.y); });

    shells.enter()
      .append("circle")
      .classed("shell", true)
      .attr("fill", "black")
      .attr("cx", function(d) { return self.state.scale(d.x); })
      .attr("cy", function(d) { return self.state.scale(d.y); });
    shells.exit().remove();

    healths
      .attr("x", function(d) { return self.state.scale(d.x - 50) })
      .attr("y", function(d) { return self.state.scale(30 + d.y); })
      .attr("height", self.state.scale(10))
      .attr("width", function(d) { return self.state.scale(d.health) });
    healths
      .enter()
      .append("rect")
      .style("fill", "red");
    healths.exit().remove();

    names
      .text(function(d) { return d.name; })
      .attr("text-anchor", "middle")
      .attr("font-family", "sans-serif")
      .attr("font-size", self.state.scale(18) + "px")
      .attr("fill", "red")
      .attr("x", function(d) { return self.state.scale(d.x); })
      .attr("y", function(d) { return self.state.scale(d.y - 30); });
    names
      .enter()
      .append("text");
    names.exit().remove();

    explosions.enter()
      .append('svg:image')
      .classed("explosion", true)
      .attr('x', function(d) { return self.state.scale(d.x - 64); })
      .attr('y', function(d) { return self.state.scale(d.y - 64); })
      .attr("width", self.state.scale(64))
      .attr("height", self.state.scale(64));
    explosions
      .attr('xlink:href', function(d) { return "../images/explosions/explosion2-" + d.explosion + ".png" } );
    explosions.exit().remove();

    this.battle_update(bodies, 18, 19, 36, 38)
      .attr("transform", function(d) { return "rotate("+(180 - d.heading)+","+self.state.scale(d.x)+","+self.state.scale(d.y)+")"});
    this.battle_update(turrets, 10, 30, 20, 54)
      .attr("transform", function(d) { return "rotate("+(180 - d.turret)+","+self.state.scale(d.x)+","+self.state.scale(d.y)+")"});
    this.battle_update(radars, 11, 8, 22, 16)
      .attr("transform", function(d) { return "rotate("+(180 - d.radar)+","+self.state.scale(d.x)+","+self.state.scale(d.y)+")"});
    this.battle_enter(bodies, "body", "../images/body.png");
    this.battle_enter(turrets, "turret", "../images/turret.png");
    this.battle_enter(radars, "radar", "../images/radar.png");
    bodies.exit().remove();
    turrets.exit().remove();
    radars.exit().remove();

    setTimeout(this.battle, 10);
  }

  battle_update = (item, x_offset=0, y_offset=0, width=1, height=1) => {
    var self = this;
    return item
             .attr("x", function(d) { return self.state.scale(d.x - x_offset); })
             .attr("y", function(d) { return self.state.scale(d.y - y_offset); })
             .attr("width", self.state.scale(width))
             .attr("height", self.state.scale(height));
  }

  battle_enter = (item, label, image) => {
    var self = this;
    return item.enter()
             .append('svg:image')
             .classed(label, true)
             .attr('xlink:href', image);
  }

  render() {
    return (
      <React.Fragment>
        <div ref={input => this.bound = input} >
          <svg ref={node => this.node = node}
            width={this.state.width} height={this.state.height} style={{"backgroundColor": "#cccccc"}} />
        </div>
      </React.Fragment>
    );
  }
}
