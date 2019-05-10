import React from 'react';
import './App.css';
import { Container, Header, Placeholder } from 'semantic-ui-react'
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
      chartData: {},
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
    this.setState({ chartData: {}});
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

  // Chart creation functions
  includeChart = () => {
    var chart;
    if (Object.keys(this.state.chartData).length !== 0) {
      chart = <ShowChart showRatingsData={this.state.chartData} />;
    }
  
    return chart;
  }

  includePlaceholder = () => {
    if (this.state.chartDataLoading) {
      return <Placeholder style={{ width: 650, height: 250 }}><Placeholder.Image square /></Placeholder>;
    }
  }

  handleCreateChart = seriesId => {
    this.setState({ showList: []});
    this.setState({ chartDataLoading: true });
    
    axios.get('/api/graph2', {
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
        { this.includePlaceholder() }
        {/* Only render the chart if it has data, otherwise it'll error, and is needless */}
        { this.includeChart() }
        
      </Container>
    );
  }
}

export default App;
