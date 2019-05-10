import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Image, Segment, Grid, GridColumn, GridRow, Header, Label, Placeholder } from "semantic-ui-react";

class ShowResultsRow extends PureComponent {

  getStatusColor = status => {
    switch (status) {
      case 'Ended':
        return "red";
      case 'Continuing':
        return "green";
      default:
        return "grey";
    }
  }

  renderYear = () => {
    if (this.props.firstAired) {
      var date = new Date(Date.parse(this.props.firstAired));
      return ' (' + date.getFullYear() + ')';
    }
  }

  renderBanner = () => {
    if (this.props.banner) {
      return <Image src={this.props.banner} size="small" alt={this.props.seriesName} />
    } else {
      return <Placeholder><Placeholder.Image></Placeholder.Image></Placeholder>
    }
  }

  render() {
    return (
      <Segment raised>
        <Grid>
          <GridRow>
            <GridColumn stretched width={3}>
              {this.renderBanner()}
            </GridColumn>
            <GridColumn width={13}>
              <GridRow>
                <Header as="h2">
                  {this.props.seriesName}
                  <span class="year">{this.renderYear()}</span>
                  <span class="labels">
                    <Label color="grey">
                      Network
                    <Label.Detail>{this.props.network}</Label.Detail>
                    </Label>
                    <Label color={this.getStatusColor(this.props.status)}>
                      Status
                    <Label.Detail>{this.props.status}</Label.Detail>
                    </Label>
                  </span>
                </Header>
              </GridRow>
              <GridRow>
                <span className="overview">{this.props.overview}</span>
              </GridRow>
            </GridColumn>
          </GridRow>
        </Grid>
      </Segment>
    );
  }
}
ShowResultsRow.propTypes = {
  seriesName: PropTypes.string,
  banner: PropTypes.string,
  firstAired: PropTypes.string,
  network: PropTypes.string,
  status: PropTypes.string,
  overview: PropTypes.string
};
export default ShowResultsRow;