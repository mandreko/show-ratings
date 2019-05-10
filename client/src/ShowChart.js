import React from "react";
import PropTypes from "prop-types";
import { Container } from 'semantic-ui-react'
import { Bar } from 'react-chartjs-2';

class ShowChart extends React.Component {

    customLabel = (e, t) => {
        var n = t.datasets[e.datasetIndex], r = e.index;
        return n.label + ": " + n.labels[r] + " | Rating: " + n.data[r]
    };

    render() {
        return (
            <Container>
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
    showRatingsData: PropTypes.object
};
export default ShowChart;