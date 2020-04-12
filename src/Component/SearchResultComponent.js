import React, { Component } from 'react';
import TableComponent from '../SubComponent/TableComponent';
import ShowMoreText from 'react-show-more-text';

let buttons_container = {
  position: 'relative',
  top: '20px',
  left: '15px',
  marginBottom: '10px',
};

let loading_container = {
  position: 'relative',
  width: '150px',
  height: '50px',
  left: '50%',
  marginLeft: '-50px' /* margin is -0.5 * dimension */,
  marginTop: '50px',
  color: '#fff',
  fontSize: '22pt',
  textAlign: 'center',
};

class SearchResultComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventData: null,
      eventColumns: [],
    };
  }

  componentDidMount() {
    fetch('https://api.songkick.com/api/3.0/search/artists.json?apikey=YS6M3mjE5yM6IoZT&query=' + this.props.currentArtist, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'community-songkick.p.rapidapi.com',
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
        let filteredData = responseData.resultsPage.results.artist.filter(
          (data) => data.displayName.toLowerCase() === this.props.currentArtist.toLowerCase()
        );
        if (filteredData.length > 0) {
          fetch('https://api.songkick.com/api/3.0/artists/' + filteredData[0].id + '/calendar.json?apikey=YS6M3mjE5yM6IoZT', {
            method: 'GET',
            headers: {
              'x-rapidapi-host': 'community-songkick.p.rapidapi.com',
              'x-rapidapi-key': 'd0e4f68c69mshd636cdffcc3db82p1b0067jsn122f741c9418',
            },
          })
            .then((response) => {
              if (!response.ok) {
                console.log('Something went wrong retreiving artist events :(');
                return;
              }
              return response.json();
            })
            .then((responseData) => {
              if (responseData.resultsPage.results.event) {
                this.setState({
                  eventData: responseData.resultsPage.results.event
                    .filter((data) => data.start.datetime)
                    .map((data) => {
                      return {
                        id: data.id,
                        type: data.type,
                        displayName: data.displayName,
                        date: data.start.datetime,
                        venue: data.venue.displayName,
                        location: data.location.city,
                        url: data.uri,
                      };
                    }),
                  eventColumns: [
                    { title: 'Type', field: 'type', width: 80 },
                    {
                      title: 'Event',
                      field: 'displayName',
                      width: 600,
                      render: (rowData) => (
                        <ShowMoreText lines={2} more="Show more" less="Show less" anchorClass="" expanded={false}>
                          {rowData.displayName}
                        </ShowMoreText>
                      ),
                    },
                    {
                      title: 'Date',
                      field: 'date',
                      render: (rowData) => <p>{new Date(rowData.date).toDateString()}</p>,
                      customSort: (a, b) => {
                        var a1 = new Date(a.date).getTime();
                        var b1 = new Date(b.date).getTime();
                        if (a1 < b1) return 1;
                        else if (a1 > b1) return -1;
                        else return 0;
                      },
                    },
                    { title: 'Venue', field: 'venue' },
                    { title: 'Location', field: 'location' },
                    {
                      title: 'Tikets',
                      field: 'url',
                      width: 100,
                      sorting: false,
                      render: (rowData) => (
                        <a href={rowData.url} target="_blank">
                          Book now
                        </a>
                      ),
                    },
                  ],
                });
              } else {
                this.setState({
                  eventData: [],
                });
              }
            });
        }
      });
  }

  render() {
    return (
      <div className="table-aligner">
        <div style={buttons_container}>
          <button className="continue-button" onClick={this.props.onHandlePreviousStep}>
            Back
          </button>
          {this.props.hasArtistImage && <img src={this.props.currentArtistImage} className="search-image" alt="artisImage" />}
          <p className="search-result-title">{this.props.currentArtist}</p>
        </div>
        {this.state.eventData ? (
          <div className="table-container">
            <TableComponent data={this.state.eventData} columns={this.state.eventColumns} />
          </div>
        ) : (
          <div style={loading_container}> Loading ... </div>
        )}
      </div>
    );
  }
}

export default SearchResultComponent;
