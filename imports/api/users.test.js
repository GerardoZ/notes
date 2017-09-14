import expect from 'expect';
import {validateNewUser} from './users';
import {Meteor} from 'meteor/meteor';

if(Meteor.isServer){
    describe('users', function(){
        it('Should allow valid email address', function(){
            const testUser = {
                emails: [
                    {
                        address: 'test@example.com'
                    }
                ]
            };
            const result = validateNewUser(testUser);
            expect(result).toBe(true);
        });
        it('Should reject invalid email address', function(){
            const testUser = {
                emails: [
                    {
                        address: 'testexamplecom'
                    }
                ]
            };
            expect(() => {
                validateNewUser(testUser);
            }).toThrow();
        });
    });
}

