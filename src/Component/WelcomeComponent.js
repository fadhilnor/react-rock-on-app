import React, { Component } from 'react';
import WelcomeDisclaimerComponent from '../SubComponent/WelcomeDisclaimer';
import logo from '../icon/logo.svg';

let inherit_height = {
  height: 'inherit',
};

let buttons_container = {
  width: '100%',
  textAlign: 'center',
};

class WelcomeComponent extends Component {
  state = {
    toggleDisclaimer: false,
  };

  handleToggleDisclaimer = () => {
    this.setState({
      toggleDisclaimer: !this.state.toggleDisclaimer,
    });
  };

  render() {
    return (
      <div style={inherit_height}>
        {!this.state.toggleDisclaimer && (
          <div className="aligner">
            <div>
              <div className="welcome-block">
                <img src={logo} className="welcome-logo" alt="logo" />
                <h3 className="welcome-intro">
                  <span className="primary-color">rock</span>
                  <span className="secondary-color">on</span>
                </h3>
                <p className="welcome-description">
                  A simple app to search your favourite music artists including tracks and album as well as any live events they
                  may participate in.
                </p>
                <div style={buttons_container}>
                  <button className="disclaimer-button" onClick={this.handleToggleDisclaimer}>
                    Disclaimer
                  </button>
                  <button className="continue-button" onClick={this.props.onHandleNextStep}>
                    Begin
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {this.state.toggleDisclaimer && <WelcomeDisclaimerComponent onToggleDisclaimer={this.handleToggleDisclaimer} />}
      </div>
    );
  }
}

export default WelcomeComponent;
