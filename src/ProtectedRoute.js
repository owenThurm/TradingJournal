import React from 'react'
import { Redirect } from 'react-router-dom'

class ProtectedRoute extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: true,
        };

    }



    render() {
        const Component = this.props.component;

        return this.state.isAuthenticated ? (
            <Component />
        ) : (
                <Redirect to={{ pathname: '/login' }} />
            );
    }
}

export default ProtectedRoute