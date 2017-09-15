import React, { Component } from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import {Notes} from '../api/notes';
import PropTypes from 'prop-types';
import NoteListHeader from './NoteListHeader';
import NoteListItem from './NoteListItem';
import NoteListEmptyItem from './NoteListEmptyItem';

function renderNotesList(notes){
    if(notes.length){
        return notes.map(note => {
            return <NoteListItem key={note._id} note={note}/>;
        });
    }else{
        return <NoteListEmptyItem/>
    }
    
}

export const NoteList = (props) =>  {
    return(
        <div>
            Notes List {props.notes.length}
            <NoteListHeader/>
            {renderNotesList(props.notes)}
        </div>
    );
};

NoteList.propTypes = {
    notes: PropTypes.array.isRequired
}

export default createContainer(() => {
    Meteor.subscribe('notes');
    return {
        notes: Notes.find().fetch()
    };
}, NoteList);
