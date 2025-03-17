import React from 'react';
import './login.css';

export default function Login() {
  return (
    <>
        <div className="uk-flex uk-flex-center uk-flex-middle sc-login-page-wrapper">
            <div className="uk-width-2-3@s uk-width-1-2@m uk-width-1-3@l uk-width-1-4@xl">
                <div className="uk-card">
                    <div className="uk-card-body">
                        <div className="sc-login-page-logo">
                            <img src="assets/img/logo_alt.png" alt="" />
                        </div>
                        <div className="sc-login-page-logo sc-login-page-logo-light">
                            <img src="assets/img/logo.png" alt="" />
                        </div>
                        <div id="sc-login-form" className="sc-toggle-login-register sc-toggle-login-password">
                            <div className="sc-login-page-inner">
                                <div className="uk-margin-medium">
                                    <label for="sc-login-username">Email/Login</label>
                                    <input id="sc-login-username" type="text" className="uk-input" data-sc-input />
                                </div>
                                <div className="uk-margin-medium">
                                    <label for="sc-login-password">Password</label>
                                    <input id="sc-login-password" type="password" className="uk-input" data-sc-input />
                                    <div className="uk-margin-small-top uk-text-small uk-text-right@s"><a href="#" className="sc-link" data-uk-toggle="target: .sc-toggle-login-password; animation: uk-animation-scale-up">Forgot Password?</a></div>
                                </div>
                                <div className="uk-margin-large-top">
                                    <a href="dashboard-v1.html" className="sc-button sc-button-large sc-button-block sc-button-danger">Sign In</a>
                                </div>
                            </div>
                        </div>
                        <div id="sc-register-form" className="sc-toggle-login-register" hidden>
                            <div className="sc-login-page-inner">
                                <div className="uk-margin-medium">
                                    <label for="sc-register-username">Name</label>
                                    <input id="sc-register-username" type="text" className="uk-input" data-sc-input />
                                </div>
                                <div className="uk-margin-medium">
                                    <label for="sc-register-email">Email</label>
                                    <input id="sc-register-email" type="text" className="uk-input" data-sc-input />
                                </div>
                                <div className="uk-margin-medium">
                                    <label for="sc-register-password">Password</label>
                                    <input id="sc-register-password" type="password" className="uk-input" data-sc-input />
                                </div>
                                <div className="uk-margin-large-top">
                                    <button className="sc-button sc-button-large sc-button-block sc-button-primary">Sign Up</button>
                                    <div className="uk-margin-large-top uk-flex uk-flex-middle uk-flex-center">
                                        <a href="#" className="sc-text-semibold" data-uk-toggle="target: .sc-toggle-login-register; animation: uk-animation-scale-up">Back to login form</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="sc-password-form" className="sc-toggle-login-password" hidden>
                            <div className="sc-login-page-inner">
                                <div className="uk-margin-medium">
                                    Please enter your email address. You will receive a link to reset your password.
                                </div>
                                <div className="uk-margin-medium">
                                    <label for="sc-reset-email">Email</label>
                                    <input id="sc-reset-email" type="text" className="uk-input" data-sc-input />
                                </div>
                                <div className="uk-margin-large-top">
                                    <button className="sc-button sc-button-large sc-button-block sc-button-primary">Reset Password</button>
                                    <div className="uk-margin-large-top uk-flex uk-flex-middle uk-flex-center">
                                        <a href="#" className="sc-text-semibold" data-uk-toggle="target: .sc-toggle-login-password; animation: uk-animation-scale-up">Back to login form</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
