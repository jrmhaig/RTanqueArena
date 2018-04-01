import React from "react"
import PropTypes from "prop-types"
import Arena from "./main/Arena"
import BotDetails from "./main/BotDetails"

class Index extends React.Component {
  static propTypes = {
    user: PropTypes.object
  }

  state = {
    battle: [
      {
        "bots": [ {
          "name": "Test",
          "x": 300,
          "y": 300,
          "heading": 0,
          "turret": 0,
          "radar": 0
        }],
        "explosions": [],
        "shells": [ { "x": 100, "y": 200 } ]
      },
      {
        "bots": [ {
          "name": "Test",
          "x": 300,
          "y": 300,
          "heading": 0,
          "turret": 0,
          "radar": 0
        }],
        "explosions": [],
        "shells": [ { "x": 110, "y": 190 } ] },
      {
        "bots": [ {
          "name": "Test",
          "x": 300,
          "y": 300,
          "heading": 0,
          "turret": 0,
          "radar": 0
        }],
        "explosions": [],
        "shells": [ { "x": 120, "y": 180 } ] },
      {
        "bots": [ {
          "name": "Test",
          "x": 300,
          "y": 300,
          "heading": 0,
          "turret": 0,
          "radar": 0
        }],
        "explosions": [],
        "shells": [ { "x": 130, "y": 170 } ] },
      {
        "bots": [ {
          "name": "Test",
          "x": 300,
          "y": 300,
          "heading": 0,
          "turret": 0,
          "radar": 0
        }],
        "explosions": [],
        "shells": [ { "x": 140, "y": 160 } ] },
      {
        "bots": [ {
          "name": "Test",
          "x": 300,
          "y": 300,
          "heading": 0,
          "turret": 0,
          "radar": 0
        }],
        "explosions": [],
        "shells": [ { "x": 150, "y": 150 } ] },
      {
        "bots": [ {
          "name": "Test",
          "x": 300,
          "y": 300,
          "heading": 0,
          "turret": 0,
          "radar": 0
        }],
        "explosions": [],
        "shells": [ { "x": 160, "y": 140 } ] },
    ],
    i: 0
  }

  getFrame = () => {
    if (this.state.i + 1 >= this.state.battle.length) {
      this.setState({ i: 0 });
    } else {
      this.setState({ i: this.state.i + 1 });
    }
    return this.state.battle[this.state.i];
  }

  newBattle = () => {
    var self = this;
    $.ajax({
      type: "GET",
      url: "api/battle",
      contentType: "application/json",
      success: function(data) {
        self.setState({
          i: 0,
          battle: data
        });
      }.bind(self),
      error: function(xhr, status, err) {
        console.error(status, err.toString());
        alert("Failed to load battle");
      }
    });
  }

  rightSidebar = () => {
    if (!this.state.battle[this.state.i]["bots"]) {
      return (<p>There are no bots!</p>);
    }
      return (
        <BotDetails
          bots={this.state.battle[this.state.i]["bots"]}
        />
      )
  }

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col">
            <button type="submit" onClick={this.newBattle}>Start</button>
          </div>
          <div className="col-6">
            <div className="jumbottron">
              <p>Please authenticate with Github.</p>
              <Arena getFrame={this.getFrame} arenaHeight={700} arenaWidth={1200} />
            </div>
          </div>
          <div className="col">
            {this.rightSidebar()}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Index
