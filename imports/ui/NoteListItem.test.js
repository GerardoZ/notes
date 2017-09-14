import expect from 'expect';
import React  from 'react';
import {mount} from 'enzyme';
import {Meteor} from 'meteor/meteor';
import moment from 'moment';

import NoteListItem from './NoteListItem';

if(Meteor.isClient){
    describe('NoteListItem', function(){
        it('Should render title and timestamp', function(){
            const title = 'New title';
            const updatedAt = moment().valueOf();
            const wrapper = mount(<NoteListItem note={{title, updatedAt}}/>);
            expect(wrapper.find('h5').text()).toBe(title);
            expect(wrapper.find('p').text()).toBe('14/09/2017');
        });

        it('Should set default title if no title set', function(){
            const updatedAt = moment().valueOf();
            const wrapper = mount(<NoteListItem note={{updatedAt}}/>);
            expect(wrapper.find('h5').text()).toBe('Untitled note');
        });
    });
}