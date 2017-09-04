import React from 'react';
import {Link} from 'react-router';

export default () => {
    return (
        <div className="boxed-view">
            <div className="boxed-view__box">
                <h1>Page not found</h1>
                <p>We are unable to find {location.pathname}</p>
                <Link className="button button--link" to="/">HEAD HOME</Link>
            </div>
        </div>
    );
}