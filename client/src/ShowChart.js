import React from "react";
import PropTypes from "prop-types";
import {  Container, Placeholder } from 'semantic-ui-react'
import { Line, Bar } from 'react-chartjs-2';

class ShowChart extends React.Component {

    // renderChart = () => {
    //     if (this.props.loading) {
    //         return (<Placeholder>
    //             <Placeholder.Image square />
    //         </Placeholder>)
    //     } else {
    //         if (this.props.showRatingsData.length > 0) {
    //             return (
    //                 <div>
    //                     <Line
    //                     data={this.props.showRatingsData}
    //                     width={650}
    //                     height={250}
    //                     options={{
    //                         maintainAspectRatio: false
    //                     }}
    //                     />
    //                 </div>
    //             )
    //         }
    //     }
    // }
    customLabel = (e, t) => {
        var n=t.datasets[e.datasetIndex],r=e.index;
        return n.label+": "+n.labels[r]+" | Rating: "+n.data[r]
    };

  render() {
    return (
      <Container>
          {/* {this.renderChart()} */}
          <Bar
            
                        data={this.props.showRatingsData}
                        width={650}
                        height={250}
                        options={{
                            maintainAspectRatio: false,
                            legend: {
                                display: false
                            },
                            scales: {
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                        max: 10
                                    }
                                }],
                                xAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                        max: 10
                                    }
                                }]
                            },
                            tooltips: {
                                callbacks: {
                                    label: this.customLabel
                                }
                            }

                        }}
                        />
      </Container>
    );
  }
}
ShowChart.propTypes = {
    loading: PropTypes.bool,
    showRatingsData: PropTypes.object
};
export default ShowChart;