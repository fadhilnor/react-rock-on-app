import React, { Component } from 'react';

class FooterComponent extends Component {
  render() {
    return (
      <div className="footer">
        <div className="footer-description">
          <span className="footer-name-text">Fadhil Japar</span> <span className="footer-copyright"> © </span>
          <span className="footer-name-text"> 2020 </span>
          <a href="https://github.com/fadhilnor/" target="_blank" className="social_links">
            <i id="social-link" className="fa fa-github-square fa-2x social align-middle" aria-hidden="true"></i>
          </a>{' '}
          <a href="mailto:fadhiljapar@gmail.com" target="_blank" className="social_links">
            <i id="social-link" className="fa fa-envelope-square fa-2x social align-middle"></i>
          </a>
        </div>
      </div>
    );
  }
}

export default FooterComponent;
