import React from "react";
import PropTypes from "prop-types";
import {  Container, Placeholder } from 'semantic-ui-react'

class ShowChart extends React.Component {

    renderChart = () => {
        if (this.props.loading) {
            return (<Placeholder>
                <Placeholder.Image square />
            </Placeholder>)
        } else {
            if (this.props.showRatingsData.length > 0) {
                return (<div>Chart goes here</div>)
            }
        }
    }

  render() {
    return (
      <Container>
          {this.renderChart()}
      </Container>
    );
  }
}
ShowChart.propTypes = {
    loading: PropTypes.bool,
    showRatingsData: PropTypes.array
};
export default ShowChart;