import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ isAuth, component: Component, ...rest }) => {
	return (
		<Route {...rest}>{isAuth ? <Redirect to='/' /> : <Component />}</Route>
	);
};

export default PublicRoute;
