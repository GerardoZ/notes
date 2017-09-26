import React from 'react';
import {Session} from 'meteor/session';
import {createContainer} from 'meteor/react-meteor-data';
import {Notes} from '../api/notes';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor';
import {browserHistory} from 'react-router';

export class Editor extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            body: ''
        }
    }

    handleTitleChange(e){
        const title = e.target.value;
        this.props.call('notes.update', this.props.note._id, {title});
        this.setState({title});
    }

    handleBodyChange(e){
        const body = e.target.value;
        this.props.call('notes.update', this.props.note._id,{body});
        this.setState({body});
    }

    handleDelete(){
        this.props.call('notes.remove', this.props.note._id);
        this.props.browserHistory.push('/dashboard');

    };

    componentDidUpdate(prevProps, prevState){
        const currentNoteId = this.props.note ? this.props.note._id : undefined;
        const prevNoteId = prevProps.note ? prevProps.note._id : undefined;
        if(currentNoteId && currentNoteId !== prevNoteId){
            this.setState({
                title: this.props.note.title,
                body: this.props.note.body
            });
        }
    }

    render(){
        if(this.props.note){
            return (
                <div className="editor">
                    <input type="text" value={this.state.title} placeholder="Title here" onChange={this.handleTitleChange.bind(this)}/>
                    <textarea value={this.state.body} placeholder="Your note here" onChange={this.handleBodyChange.bind(this)}></textarea>
                    <button onClick={this.handleDelete.bind(this)}>Delete note</button>
                </div>
            );
        }else{
            return (
                <div className="editor">
                    <p>{this.props.selectedNoteId ? 'Note not found :/' : 'Pick or create a note to get started'}</p>
                </div>
            )
        }
    }
}

Editor.PropTypes = {
        selectedNoteId: PropTypes.string,
        note: PropTypes.object,
        call: PropTypes.func.isRequired,
        browserHistory: PropTypes.object.isRequired
};

export default createContainer(() => {
    const selectedNoteId = Session.get('selectedNoteId');
    return {
        selectedNoteId,
        note: Notes.findOne(selectedNoteId),
        call: Meteor.call,
        browserHistory
    };
}, Editor);
