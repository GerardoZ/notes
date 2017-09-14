import React, { Component } from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';


export class NoteListHeader extends Component {
    render() {
        return (
            <div>
                <button onClick={() => this.props.meteorCall('notes.insert')}>Create Note</button>
            </div>
        )
    }
}

NoteListHeader.propTypes = {
    meteorCall: PropTypes.func.isRequired
}

export default createContainer(() => {
    return {
        meteorCall: Meteor.call
    };
}, NoteListHeader);