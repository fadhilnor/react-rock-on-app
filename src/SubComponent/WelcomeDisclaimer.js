import React, { Component } from 'react';
import logo from '../icon/logo.svg';

let padding_outline = {
  padding: '20px',
};

let logo_properties = {
  height: '80px',
  display: 'block',
  margin: '5px auto',
};

let buttons_container = {
  width: '100%',
  textAlign: 'center',
};

class WelcomeDisclaimerComponent extends Component {
  render() {
    return (
      <div className="none-aligner">
        <div className="container welcome-details-block">
          <div className="row">
            <div style={padding_outline} className="col-xs-12">
              <img src={logo} style={logo_properties} alt="App Logo" />
              <h3 className="welcome-intro">
                <span className="primary-color">rock</span>
                <span className="secondary-color">on</span>
              </h3>
              <p className="disclaimer-details">
                Everyone listens to music. Be it at home, while commuting or during exercise. Music is a part of life.
              </p>
              <h3 className="disclaimer-title">Artists and Events</h3>
              <p className="disclaimer-details">
                The artists information were taken from the No.1 site for listening to music on demand{' '}
                <a className="disclaimer-url" href="https://developers.deezer.com/api/" target="_blank">
                  Deezer{' '}
                </a>
                API.
                <br />
                <br />
                Any events that the artists may perform in were obtained through{' '}
                <a className="disclaimer-url" href="https://www.songkick.com/developer/" target="_blank">
                  Songkick's{' '}
                </a>
                API.
              </p>
              <h3 className="disclaimer-title">Development</h3>
              <p className="disclaimer-details">
                {' '}
                This project is made for personal educational purposes and is not to be used commercially without the consent of
                the atributed parties. It is a simple app that is suitable for anyone who wants to learn the basic and
                fundamentals of React. Keep on rockin!
              </p>
              <h3 className="disclaimer-title">Special Thanks</h3>
              <p className="disclaimer-details">
                {' '}
                Icon designed by{' '}
                <a className="disclaimer-url" href="https://www.flaticon.com/authors/xnimrodx/" target="_blank">
                  xnimrodx{' '}
                </a>{' '}
                from{' '}
                <a className="disclaimer-url" href="https:/www.flaticon.com/" target="_blank">
                  Flaticon
                </a>
                .
              </p>
              <div style={buttons_container}>
                <button className="continue-button" onClick={this.props.onToggleDisclaimer}>
                  Return
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WelcomeDisclaimerComponent;
