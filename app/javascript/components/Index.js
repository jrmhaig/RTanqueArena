import React from "react"
import PropTypes from "prop-types"
import Arena from "./main/Arena"

class Index extends React.Component {
  static propTypes = {
    user: PropTypes.object
  }

  state = {
    battle: [
      { "shells": [ { "x": 100, "y": 200 } ] },
      { "shells": [ { "x": 110, "y": 190 } ] },
      { "shells": [ { "x": 120, "y": 180 } ] },
      { "shells": [ { "x": 130, "y": 170 } ] },
      { "shells": [ { "x": 140, "y": 160 } ] },
      { "shells": [ { "x": 150, "y": 150 } ] },
      { "shells": [ { "x": 160, "y": 140 } ] },
    ],
    i: 0
  }

  getFrame = () => {
    this.setState({ i: this.state.i + 1 });
    if (this.state.i >= this.state.battle.length) {
      this.setState({ i: 0 });
    }
    return this.state.battle[this.state.i];
    return {
      "shells": [
        { "x": 100, "y": 200 },
        { "x": 200, "y": 100 },
        { "x": 300, "y": 250 }
      ]
    }
  }

  render () {
    console.log(this.props.user);
    return (
      <React.Fragment>
        <div className="row">
          <div className="col">
            Left
          </div>
          <div className="col-6">
            <div className="jumbottron">
              <p>Please authenticate with Github.</p>
              <Arena getFrame={this.getFrame} />
            </div>
          </div>
          <div className="col">
            Right
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Index
