import React from "react";
import PropTypes from "prop-types";
import {  Container } from 'semantic-ui-react'
import ShowResultsRow from "./ShowResultsRow";

class ShowResults extends React.Component {

  render() {
    return (
      <Container>
          
                {this.props.showData.map(showData => (
                    <ShowResultsRow
                    key={showData.id}
                    seriesName={showData.seriesName}
                    network={showData.network}
                    firstAired={showData.firstAired}
                    banner={showData.banner}
                    status={showData.status}
                    overview={showData.overview}
                    />
                ))}
            
      </Container>
    );
  }
}
ShowResults.propTypes = {
    showData: PropTypes.array
};
export default ShowResults;