import React from 'react';
import './App.css';
import { Container, Header } from 'semantic-ui-react'
import SearchBar from './SearchBar';
import ShowResults from './ShowResults';
import ShowChart from './ShowChart';
import axios from 'axios/index';
import { debounce } from 'lodash';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredShow: '',
      showList: [],
      chartData: [],
      showListLoading: false,
      chartDataLoading: false
    };
  }

  // Search functions
  handleSearchChange = event => {
    this.setState({
      filteredShow: this.filterShow(event.target.value, 20)
    });
  };

  filterShow = debounce((searchText) => {
    this.setState({ showListLoading: true });
    axios.get('/api/search', {
      params: {
        q: searchText
      }
    })
      .then((res) => {
        if (res.data) {
          this.setState({ showList: res.data });
          this.setState({ showListLoading: false });
        }
      })
  }, 1000);

  handleCreateChart = seriesId => {
    this.setState({ showList: []});
    this.setState({ chartDataLoading: true });
    
    //alert('chart being created for series id: ' + seriesId);
    axios.get('/api/graph', {
      params: {
        series_id: seriesId
      }
    })
      .then((res) => {
        if (res.data) {
          this.setState({ chartData: res.data });
          this.setState({ chartDataLoading: false });
        }
      })
  };

  render() {
    return (
      <Container style={{ marginTop: '3em' }}>
        <Header as='h1'>TV Show Ratings Graph Creator</Header>

        <SearchBar textChange={this.handleSearchChange} loading={this.state.showListLoading} />
        <p></p>
        <ShowResults showData={this.state.showList} chartButtonClick={this.handleCreateChart} marginTop="1em" />
        <p></p>
        <ShowChart showRatingsData={this.state.chartData} loading={this.state.chartDataLoading}  />
      </Container>
    );
  }
}

export default App;
