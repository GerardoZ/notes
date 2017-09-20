import React from 'react';
import {Session} from 'meteor/session';
import {createContainer} from 'meteor/react-meteor-data';
import {Notes} from '../api/notes';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor';

export class Editor extends React.Component{
    constructor(props){
        super(props);
    }
    handleTitleChange(e){
        this.props.call('notes.update', this.props.note._id, {title: e.target.value});
    }
    handleBodyChange(e){
        this.props.call('notes.update', this.props.note._id,{body: e.target.value});
    }
    render(){
        if(this.props.note){
            return (
                <div>
                    <input type="text" value={this.props.note.title} placeholder="Title here" onChange={this.handleTitleChange.bind(this)}/>
                    <textarea value={this.props.note.body} placeholder="Your note here" onChange={this.handleBodyChange.bind(this)}></textarea>
                    <button>Delete note</button>
                </div>
            );
        }else{
            return <p>{this.props.selectedNoteId ? 'Note not found :/' : 'Pick or create a note to get started'}</p>
        }
    }
}

Editor.PropTypes = {
        selectedNoteId: PropTypes.string,
        note: PropTypes.object
};

export default createContainer(() => {
    const selectedNoteId = Session.get('selectedNoteId');
    return {
        selectedNoteId,
        note: Notes.findOne(selectedNoteId),
        call: Meteor.call
    };
}, Editor);