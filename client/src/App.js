import React from 'react';
import './App.css';
import { Container, Header } from 'semantic-ui-react'
import SearchBar from './SearchBar';
import ShowResults from './ShowResults';
import axios from 'axios/index';
import { debounce } from 'lodash';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredShow: '',
      showList: [],
      loading: false
    };
  }

  // Search functions
  handleSearchChange = event => {
    this.setState({
      filteredShow: this.filterShow(event.target.value, 20)
    });
  };

  filterShow = debounce((searchText, maxResults) => {
    this.setState({ loading: true });
    axios.get('/api/search', {
      params: {
        q: searchText
      }
    })
      .then((res) => {
        // TODO: Do something with the responses to show the user the show list
        if (res.data) {
          this.setState({ showList: res.data });
          this.setState({ loading: false });
        }
      })
  }, 1000);

  render() {
    return (
      <Container style={{ marginTop: '3em' }}>
        <Header as='h1'>TV Show Ratings Graph Creator</Header>

        <SearchBar textChange={this.handleSearchChange} loading={this.state.loading} />
        <p></p>
        <ShowResults showData={this.state.showList} marginTop="1em" />
      </Container>
    );
  }
}

export default App;
