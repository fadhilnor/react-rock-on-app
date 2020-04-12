import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './Component/App';
import FooterComponent from './SubComponent/FooterComponent';

class RenderApp extends Component {
  render() {
    return (
      <div className="body">
        <App />
        <FooterComponent />
      </div>
    );
  }
}

ReactDOM.render(<RenderApp />, document.getElementById('root'));
