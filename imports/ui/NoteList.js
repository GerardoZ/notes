import React, { Component } from 'react';
import {createContainer} from 'meteor/react-meteor-data';
import {Meteor} from 'meteor/meteor';
import {Session} from 'meteor/session';
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
        <div className="item-list">
            <NoteListHeader/>
            {renderNotesList(props.notes)}
        </div>
    );
};

NoteList.propTypes = {
    notes: PropTypes.array.isRequired
}

export default createContainer(() => {
    const selectedNoteId = Session.get('selectedNoteId');
    Meteor.subscribe('notes');
    return {
        notes: Notes.find({},{sort: {updatedAt: -1}}).fetch().map((note) => {
            return note = {
                ...note,
                selected: (selectedNoteId === note._id)
            }
        })
    };
}, NoteList);
