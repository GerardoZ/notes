import React, { Component } from 'react';
import PrivateHeader from './PrivateHeader';
import NoteList from './NoteList';
import Editor from './Editor';

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <PrivateHeader title="Notes"/>
                <div className="wrapper__content">
                    <div className="wrapper__sidebar">
                        <NoteList/>
                    </div>
                    <div className="wrapper__main">
                        <Editor/>
                    </div>
                </div>
            </div>
        )
    }
}
