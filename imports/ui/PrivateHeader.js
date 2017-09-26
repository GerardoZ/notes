import React from 'react';
import PropTypes from 'prop-types';
import {Accounts} from 'meteor/accounts-base';
import {createContainer} from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';

export const PrivateHeader = (props) => {
    const navImageSource = props.isNavOpen ? '/images/x.svg' : '/images/bars.svg';
    return(
        <div className="title-bar">
            <div className="title_bar__content">
                <img className="title_bar__nav-toggle" onClick={props.handleNavToggle.bind(this)} src={navImageSource} />
                <h1 className="title-bar__title">{props.title}</h1>
                <button className="button button--link-text" onClick={() => props.handleLogout()}>Logout</button>
            </div>
        </div>
    );
};

PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired,
    handleLogout: PropTypes.func.isRequired,
    handleNavToggle: PropTypes.func.isRequired,
    isNavOpen: PropTypes.bool.isRequired
};

export default createContainer(() => {
    return{
        handleLogout: () => Accounts.logout(),
        handleNavToggle: () => Session.set('isNavOpen', !Session.get('isNavOpen')),
        isNavOpen: Session.get('isNavOpen')
    };
}, PrivateHeader)
