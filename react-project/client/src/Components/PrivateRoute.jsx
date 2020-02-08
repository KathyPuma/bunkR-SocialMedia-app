import React from 'react'
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = (props) => {
    const isUserLoggedIn = props.isUserLoggedIn
    const Component = props.Component
    const otherProps = { ...props }

    if (isUserLoggedIn) {
        return <Route {...otherProps} component={Component} />
    }
    return <Redirect to='/login' />
}

export default PrivateRoute;