import React from "react"
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Progress
} from "reactstrap"
import PropTypes from "prop-types"

export default class BotDetails extends React.Component {
  static propTypes = {
    bots: PropTypes.array
  };

  healthBar = (bot) => {
    var colour = "success";
    if (bot.health < 25) {
      colour = "danger";
    } else if (bot.health < 75) {
      colour = "warning";
    }
    return (<Progress color={colour} value={bot.health} />);
  };

  render () {
    self = this;
    return (
      <React.Fragment>
        {this.props.bots.map(function(bot){
          return (
            <Card>
              <CardHeader>{bot.name}</CardHeader>
              <CardBody>
                <CardText>
                  {self.healthBar(bot)}
                </CardText>
              </CardBody>
            </Card>
            );
        })}
      </React.Fragment>
    );
  }
}
