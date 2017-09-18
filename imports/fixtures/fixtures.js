import moment from 'moment';

export const notes = [
    {
        _id: 'noteId1',
        title: 'Test title',
        body: '',
        updatedAt: moment().valueOf(),
        userId: 'userId1'
    },
    {
        _id: 'noteId2',
        title: '',
        body: 'Something',
        updatedAt: moment.valueOf(),
        userId: 'userId2'
    }
];
