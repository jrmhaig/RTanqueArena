import React from "react"
import PropTypes from "prop-types"

export default class Header extends React.Component {
  static propTypes = {
    user: PropTypes.string
  }

  LoginBox = () => {
    return (
      <div className="dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarLogin" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Login
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarLogin">
          <a className="dropdown-item" href="/auth/github">Github</a>
        </div>
      </div>
    );
  }

  render () {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="/">RTanque Arena</a>

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {LoginBox()}
        </div>
      </nav>
    );
  }
}
