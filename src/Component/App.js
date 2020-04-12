import React, { Component } from 'react';
import WelcomeComponent from './WelcomeComponent';
import SearchComponent from './SearchComponent';
import SearchResultComponent from './SearchResultComponent';

class App extends Component {
  state = {
    stage: 1,
    currentArtist: '',
    currentArtistImage: '',
    hasArtistImage: false,
  };

  handleNextStep = () => {
    this.setState({
      stage: this.state.stage + 1,
    });
  };

  handlePreviousStep = () => {
    this.setState({ stage: this.state.stage - 1 });
  };

  handleUpdateArtist = (e, image, hasImage) => {
    this.setState({
      currentArtist: e.value,
      currentArtistImage: image,
      hasArtistImage: hasImage,
    });
  };

  render() {
    switch (this.state.stage) {
      case 1:
        return <WelcomeComponent onHandleNextStep={this.handleNextStep} />;
      case 2:
        return (
          <SearchComponent
            onHandleNextStep={this.handleNextStep}
            onHandlePreviousStep={this.handlePreviousStep}
            onHandleUpdateArtist={this.handleUpdateArtist}
            searchable
          />
        );
      case 3:
        return (
          <SearchResultComponent
            currentArtist={this.state.currentArtist}
            currentArtistImage={this.state.currentArtistImage}
            hasArtistImage={this.state.hasArtistImage}
            onHandlePreviousStep={this.handlePreviousStep}
          />
        );
      default:
        return null;
    }
  }
}

export default App;
