import expect from 'expect';
import React  from 'react';
import {mount} from 'enzyme';
import {Meteor} from 'meteor/meteor';
import moment from 'moment';

import {NoteListHeader} from './NoteListHeader';

if(Meteor.isClient){
    describe('NoteListHeader', function(){
        it('Should call meteorCall on click', function(){
            const spy = expect.createSpy();            
            const wrapper = mount(<NoteListHeader meteorCall={spy}/>);
            wrapper.find('button').simulate('click');
            expect(spy).toHaveBeenCalledWith('notes.insert');
        });
    });
}
