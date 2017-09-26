import React, { Component } from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';
import {Session} from 'meteor/session';


export class NoteListHeader extends Component {
    render() {
        return (
            <div className="item-list__header">
                <button className="button" onClick={() => this.props.meteorCall('notes.insert', (err, res) => {
                    if(res){
                        this.props.Session.set('selectedNoteId', res);
                    }
                })}>Create Note</button>
            </div>
        )
    }
}

NoteListHeader.propTypes = {
    meteorCall: PropTypes.func.isRequired,
    Session: PropTypes.object.isRequired
}

export default createContainer(() => {
    return {
        meteorCall: Meteor.call,
        Session
    };
}, NoteListHeader);
