import React from 'react';
import { Button, Form, Segment } from 'semantic-ui-react'
import PropTypes from "prop-types";

class SearchBar extends React.Component {

    handleChange = event => {
        this.props.textChange(event);
    };

    render() {
        return (
            <Form size='large'>
                <Segment raised>
                    <Form.Input loading={this.props.loading} fluid icon='search' iconPosition='left' placeholder='TV Show Name' onChange={this.handleChange} />
                </Segment>
            </Form>
        );
    }
}

SearchBar.propTypes = {
    textChange: PropTypes.func,
    loading: PropTypes.bool
};

export default SearchBar;