import {Meteor} from 'meteor/meteor';
import React from 'react';
import {mount} from 'enzyme';
import expect from 'expect';
import {NoteList} from './NoteList';
import {notes} from '../fixtures/fixtures';



if(Meteor.isClient){
    describe('NoteList', function(){
        it('Should render NoteListItem for each note', function(){
            const wrapper = mount(<NoteList notes={notes}/>);
            expect(wrapper.find('NoteListItem').length).toBe(notes.length);
            expect(wrapper.find('NoteListEmptyItem').length).toBe(0);
        });
        it('Should render NoteListEmptyItem if 0 notes', function(){
            const wrapper = mount(<NoteList notes={[]}/>);
            expect(wrapper.find('NoteListItem').length).toBe(0);
            expect(wrapper.find('NoteListEmptyItem').length).toBe(1);
        });
    });
}
