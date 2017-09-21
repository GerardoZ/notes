import expect from 'expect';
import React  from 'react';
import {mount} from 'enzyme';
import {Meteor} from 'meteor/meteor';
import moment from 'moment';

import {NoteListHeader} from './NoteListHeader';
import {notes} from '../fixtures/fixtures';

if(Meteor.isClient){
    let meteorCall;
    let Session;
    beforeEach(function(){
        meteorCall = expect.createSpy();
        Session = {
            set: expect.createSpy()
        }
    });
    describe('NoteListHeader', function(){
        it('Should call meteorCall on click', function(){
            const wrapper = mount(<NoteListHeader meteorCall={meteorCall} Session={Session}/>);
            wrapper.find('button').simulate('click');

            meteorCall.calls[0].arguments[1](undefined, notes[0]._id);
            expect(meteorCall.calls[0].arguments[0]).toBe('notes.insert');
            expect(Session.set).toHaveBeenCalledWith('selectedNoteId', notes[0]._id);
        });

        it('Should not set session for failed insert', function(){
            const wrapper = mount(<NoteListHeader meteorCall={meteorCall} Session={Session}/>);
            wrapper.find('button').simulate('click');

            meteorCall.calls[0].arguments[1]('This is an error', undefined);
            expect(Session.set).toNotHaveBeenCalled();
        });
    });
}
