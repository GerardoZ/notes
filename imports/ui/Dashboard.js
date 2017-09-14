import React, { Component } from 'react';
import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <PrivateHeader title="Dashboard"/>
                <div className="wrapper">
                    <NoteList/>
                </div>
            </div>
        )
    }
}
