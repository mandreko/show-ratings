import React from "react";
import PropTypes from "prop-types";
import {  Container } from 'semantic-ui-react'

class ShowChart extends React.Component {

    

  render() {
    return (
      <Container>
          
                {/* {this.props.showRatingsData.map(showData => (
                    <ShowResultsRow
                    key={showData.id}
                    seriesName={showData.seriesName}
                    network={showData.network}
                    firstAired={showData.firstAired}
                    banner={showData.banner}
                    status={showData.status}
                    overview={showData.overview}
                    />
                ))} */}
            
      </Container>
    );
  }
}
ShowChart.propTypes = {
    onChange: PropTypes.func,
    showRatingsData: PropTypes.array
};
export default ShowChart;