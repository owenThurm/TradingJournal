import React from 'react'
import { Redirect } from 'react-router-dom'

class ProtectedRoute extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        const Component = this.props.component;
        const isAuthenticated = true;

        return isAuthenticated ? (
            <Component />
        ) : (
                <Redirect to={{ pathname: '/login' }} />
            );
    }
}

export default ProtectedRoute