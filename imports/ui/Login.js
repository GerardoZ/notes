import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Link} from 'react-router';
import {createContainer} from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

export class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {error: ''};
    }
    onSubmit = (e) => {
        e.preventDefault();
        let email = this.refs.email.value.trim();
        let password = this.refs.password.value.trim();
        this.props.loginWithPassword({email}, password, (err) => {
            if(err){
                this.setState({error: 'Unable to login. Check email and password.'});
            }else{
                this.setState({error: ''});
            }
        });

    }
    render(){
        if(this.state.redirectToReferrer){
            return <Redirect to="/links"/>;
        }


        return(
            <div className="boxed-view">
                <div className="boxed-view__box">
                    <h1>Login</h1>

                    {this.state.error ? <p>{this.state.error}</p> : undefined}
                    <form className="boxed-view__form" onSubmit={this.onSubmit.bind(this)} noValidate>
                        <input type="email" ref="email" name="email" placeholder="Email"/>
                        <input type="password" ref="password" name="password" placeholder="Password"/>
                        <button className="button">Login</button>
                    </form>

                    <Link to='/signup'>Have an account?</Link>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    loginWithPassword: PropTypes.func.isRequired
}

export default createContainer(() => {
    return {
        loginWithPassword: Meteor.loginWithPassword
    }
}, Login);