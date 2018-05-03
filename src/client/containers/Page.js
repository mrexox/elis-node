import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import '../styles/Page.css';
import { ADMIN, CONTACT_US, LOGIN_URL,
		 REGISTER_URL, LOGOUT_URL, CART_URL,
		 HOME, ABOUT, SEARCH } from '../Constants';
import HomePage from '../components/HomePage';
import AboutPage from '../components/AboutPage';
import MainMenu from './MainMenu';
import LoginPage from '../components/LoginPage';
import Logout from './Logout';
import RegisterPage from '../components/RegisterPage';
import AdminPage from '../components/AdminPage';
import AdminMenu from '../components/AdminMenu';
import CartPage from '../components/CartPage';


/*
 * TODO We need to add some logic for SEARCH in the future
 * @param - first url word
 * @sub   - second url word
 */
let Page = ({ param, sub }) => {
	let menuComponent = (<Route path={`/${param}`} component={MainMenu} />);
	if (param === 'admin') {
		menuComponent = (<Route path={`/${ADMIN}`} component={AdminMenu} />);
	}

	return (
		<div>
		  {menuComponent}
		  <div className="page">
			<Route exact path={`/`} component={HomePage} />
			<Route exact path={`/${HOME}`} component={HomePage} />
			<Route exact path={`/${ABOUT}`} component={AboutPage} />
			<Route exact path={`/${SEARCH}`} component={HomePage} />
			<Route exact path={`/${CONTACT_US}`} component={AboutPage} />
			<Route exact path={`/${LOGIN_URL}`} component={LoginPage} />
			<Route exact path={`/${REGISTER_URL}`} component={RegisterPage} />
			<Route exact path={`/${LOGOUT_URL}`} component={Logout} />
			<Route exact path={`/${CART_URL}`} component={CartPage} />
			<Route path={`/${ADMIN}`} component={AdminPage} />
		  </div>
		</div>
	);
};

// The only and the one component Page in the application
// That's why it is connected to itself
Page = connect()(Page);

export default Page;
