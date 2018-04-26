import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { REDIRECT_AFTER_LOGIN, REGISTER_URL } from '../Constants';
import { loginRequest, loginError } from '../actions/loginActions';
import LoadingImage from '../img/Loading.gif';
import '../styles/AuthForm.css';

class LoginPage extends Component {
    handleSubmit() {
        var data = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        }

        var valid = this.validate(data);
        if (valid === true) {
            this.props.onLogin(data);
        }
        else {
            this.props.onError(valid);
        }
    }

    validate() {
        // TODO: validation form, return true or error msg
        return true;
    }

    handleEnterBtnClick(event) {
        if (event.key === 'Enter') {
            this.handleSubmit();
        }
    }

    render() {
        const { isSigned, isError, inProcess, errorMsg } = this.props;

        if (isSigned) return (
            <Redirect to={{ pathname: `/${REDIRECT_AFTER_LOGIN}` }}/>
        );
        else return (
            <form className="auth" onKeyDown={this.handleEnterBtnClick.bind(this)}>
                <fieldset>
                    <legend>Log in to shop</legend>
                    <div className="error" hidden={!isError}>
                        {errorMsg}
                    </div>
                    <p>
                        <input
                            type="text"
                            id="email"
                            placeholder="Email"
                            className="email"
                            autoComplete="email"
                        />
                    </p>
                    <p>
                        <input 
                            type="password"
                            id="password"
                            placeholder="Password"
                            className="password"
                            autoComplete="current-password"
                        />
                    </p>
                
                    <input 
                        type="button"
                        value="Log in"
                        onClick={this.handleSubmit.bind(this)}
                        className="btn"
                        id="loginBtn"
                        hidden={inProcess}
                    />
                    <button
                        className="btn wait_btn"
                        hidden={!inProcess}
                        disabled
                    ><img src={LoadingImage} alt="logining..."/></button>
                    <NavLink to={`/${REGISTER_URL}`} >
                        <input
                            type="button"
                            value="Register"
                            className="btn"
                            id="signupBtn"
                        />
                    </NavLink>
                </fieldset>
            </form>
        );
    }
}

export default connect(
    state => ({
        inProcess: state.login.status === 'request',
        isSigned: state.login.status === 'signed',
        isError: state.login.status === 'error',
        errorMsg: state.login.message
    }),
    dispatch => ({
        onLogin: bindActionCreators(loginRequest, dispatch),
        onError: bindActionCreators(loginError, dispatch)
    })
)(LoginPage);
