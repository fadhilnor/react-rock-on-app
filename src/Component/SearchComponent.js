import React, { Component } from 'react';
import Select from 'react-select';

let section_width = {
  maxWidth: '450px',
  margin: '0 auto',
};

let back_buttons_container = {
  position: 'fixed',
  top: '20px',
  left: '15px',
  marginBottom: '10px',
};

let buttons_container = {
  width: '100%',
  textAlign: 'center',
  marginTop: '20px',
};

class SearchComponent extends Component {
  constructor() {
    super();
    this.timeout = 0;
  }

  state = {
    search: [],
    selectValue: '',
    image: '',
    hasImage: false,
  };

  updateSearch = (search) => {
    if (search === '') return;
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      fetch('https://deezerdevs-deezer.p.rapidapi.com/search?q=' + search, {
        method: 'GET',
        headers: {
          'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
          'x-rapidapi-key': 'd0e4f68c69mshd636cdffcc3db82p1b0067jsn122f741c9418',
        },
      })
        .then((response) => {
          if (!response.ok) {
            console.log('Something went wrong retreiving artist info :(');
            return;
          }
          return response.json();
        })
        .then((responseData) => {
          if (responseData.error) {
            this.setState({
              search: [
                {
                  value: '',
                  label: '',
                },
              ],
              image: '',
              hasImage: false,
            });
          } else {
            let filteredData = responseData.data.filter((data) => data.artist.name.toLowerCase() === search.toLowerCase());
            if (filteredData.length > 0) {
              this.setState({
                search: [
                  {
                    value: responseData.data[0].artist.name,
                    label: responseData.data[0].artist.name,
                  },
                ],
                image: responseData.data[0].artist.picture_medium,
                hasImage: true,
              });
            } else {
              this.setState({
                search: [
                  {
                    value: '',
                    label: '',
                  },
                ],
                image: '',
                hasImage: false,
              });
            }
          }
        });
    }, 1000);
  };

  updateValue = (newValue) => {
    this.setState({
      selectValue: newValue,
    });
    let self = this.state;
    this.props.onHandleUpdateArtist(newValue, self.image, self.hasImage);
  };

  render() {
    return (
      <div className="aligner">
        <div style={back_buttons_container}>
          <button className="continue-button" onClick={this.props.onHandlePreviousStep}>
            Back
          </button>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              {this.state.hasImage && <img src={this.state.image} className="search-image" alt="logo" />}
              <p className="search-title">Enter an artist or band name</p>
              <div style={section_width} className="section">
                <Select
                  placeholder="Search"
                  autofocus
                  clearable
                  disabled="false"
                  options={this.state.search}
                  value={this.state.selectValue}
                  onInputChange={this.updateSearch}
                  onChange={this.updateValue}
                  searchable
                />
              </div>
            </div>
          </div>
          {this.state.selectValue !== '' && (
            <div style={buttons_container}>
              <button className="continue-button" onClick={this.props.onHandleNextStep}>
                Select
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default SearchComponent;
