import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ isAuth, component: Component, ...rest }) => {
	return (
		<Route {...rest}>{isAuth ? <Component /> : <Redirect to='/login' />}</Route>
	);
};

export default PrivateRoute;
