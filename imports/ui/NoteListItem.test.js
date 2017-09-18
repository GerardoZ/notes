import expect from 'expect';
import React  from 'react';
import {mount} from 'enzyme';
import {Meteor} from 'meteor/meteor';
import moment from 'moment';
import {notes} from '../fixtures/fixtures';

import {NoteListItem} from './NoteListItem';

if(Meteor.isClient){
    describe('NoteListItem', function(){
        let Session;
        beforeEach(() => {
            Session = {
                set: expect.createSpy()
            };
        });

        it('Should render title and timestamp', function(){
            const title = 'New title';
            const updatedAt = moment().valueOf();
            const wrapper = mount(<NoteListItem note={notes[0]} Session={Session}/>);
            expect(wrapper.find('h5').text()).toBe(notes[0].title);
            expect(wrapper.find('p').text()).toBe(moment().format('DD/MM/YYYY'));
        });

        it('Should set default title if no title set', function(){
            const updatedAt = moment().valueOf();
            const wrapper = mount(<NoteListItem note={{updatedAt}} Session = {Session}/>);
            expect(wrapper.find('h5').text()).toBe('Untitled note');
        });

        it('Should call set on click', function(){
            const wrapper = mount(<NoteListItem note={notes[0]} Session={Session}/>);
            wrapper.find('div').simulate('click');
            expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id);

        });
    });
}
