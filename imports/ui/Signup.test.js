import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';

import {Signup} from './Signup';

if(Meteor.isClient){
    describe('Signup', function(){
        it('Should show error messages', function(){
            const error = "This is not working";
            const wrapper = mount(<Signup createUser={() => {}}/>);
            wrapper.setState({error});
            const pText = wrapper.find('p').text();
            expect(pText).toBe(error);

            wrapper.setState({error: ''});
            expect(wrapper.find('p').length).toBe(0);
        });

        it('Should call createUser with the form data', function(){
            const email = 'email@test.com';
            const password = 'password123';
            const spy = expect.createSpy();
            const wrapper = mount(<Signup createUser={spy}/>);
            wrapper.ref('email').node.value = email;
            wrapper.ref('password').node.value = password;
            wrapper.find('form').simulate('submit');

            expect(spy.calls[0].arguments[0]).toEqual({email, password});
        });

        it('Should set error if short password', function(){
            const email = 'email@test.com';
            const password = '123';
            const spy = expect.createSpy();
            const wrapper = mount(<Signup createUser={spy}/>);
            wrapper.ref('email').node.value = email;
            wrapper.ref('password').node.value = password;
            wrapper.find('form').simulate('submit');

            expect(wrapper.state('error').length).toNotBe(0);
        });

        it('Should set createUser callback errors', function(){
            const password = 'password123';
            const reason = 'reason';
            const spy = expect.createSpy();
            const wrapper = mount(<Signup createUser={spy}/>);
            wrapper.ref('password').node.value = password;            
            wrapper.find('form').simulate('submit');
            spy.calls[0].arguments[1]({reason});
            expect(wrapper.state('error')).toBe(reason);
            spy.calls[0].arguments[1]();
            expect(wrapper.state('error')).toBe('');
            
        });
    });
}