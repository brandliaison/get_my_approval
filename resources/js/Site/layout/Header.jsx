import React from 'react';

export default function Header() {
  return (
    <>

        {/* <!-- nav bar  --> */}
        <div className="navbar">
            <div
                className="nav-top main-background uk-padding-small uk-padding-remove-horizontal"
            >
                <div className="custom-container">
                <div className="uk-flex uk-flex-center uk-flex-between uk-flex-middle">
                    <p className="color-white">
                    <i data-lucide="phone" className="icons uk-margin-small-right"></i
                    >Helpline No : 91-9810363988
                    </p>
                    <p className="color-white">
                    <i data-lucide="mail" className="icons uk-margin-small-right"></i
                    >E-Mail:info@exportapproval.com
                    </p>
                    <p className="color-white">
                    <i data-lucide="map-pin" className="icons uk-margin-small-right"></i
                    >Laxmi Nagar Delhi - 110092, India
                    </p>
                </div>
                </div>
            </div>
            <div className="nav-midile uk-padding-small uk-padding-remove-horizontal">
                <div className="custom-container uk-flex uk-flex-between uk-flex-middle">
                <div className="one">
                    <a href="/">
                        <img src="./images/logos/logonavone.png" />
                    </a>
                </div>
                <div className="two">
                    <img src="./images/logos/logonavtwo.png" />
                </div>
                <div className="three">
                    <img src="./images/logos/logonavthree.png" />
                </div>
                </div>
            </div>
            <div className="nav-last uk-box-shadow-medium uk-padding-small uk-padding-remove-horizontal">
                <div className="custom-container uk-flex uk-flex-between uk-flex-middle">
                <div className="nav-last-left uk-flex">
                    <a href="/services.html" className="uk-link-reset">
                        <div className="uk-flex uk-flex-middle uk-margin-large-right">
                        <img
                            src="./images/notifications/solutions.png"
                            className="uk-margin-right"
                        />
                        <h5 className="uk-text-bold main-color uk-margin-remove">
                            Solutions
                        </h5>
                        </div>
                    </a>
                    <a href="/notification.html" className="uk-link-reset">
                        <div className="uk-flex uk-flex-middle uk-margin-large-right">
                        <img
                            src="./images/notifications/notification.png"
                            className="uk-margin-right"
                        />
                        <h5 className="uk-text-bold main-color uk-margin-remove">
                            Notification
                        </h5>
                        </div>
                    </a>
                    <a href="/tutorial.html" className="uk-link-reset">
                        <div className="uk-flex uk-flex-middle uk-margin-large-right">
                        <img
                            src="./images/notifications/tutorials.png"
                            className="uk-margin-right"
                        />
                        <h5 className="uk-text-bold main-color uk-margin-remove">
                            Tutorials
                        </h5>
                        </div>
                    </a>
                </div>
                <div className="nav-last-right">
                    <ul>
                    <li className="uk-padding-small uk-padding-remove-vertical">
                        <i data-lucide="user-plus" className="main-color"></i>
                        <h5
                        className="uk-margin-small uk-margin-remove-bottom uk-text-bold main-color"
                        >
                        Join Us
                        </h5>
                    </li>
                    <li className="uk-padding-small uk-padding-remove-vertical">
                        <i data-lucide="user" className="main-color"></i>
                        <h5
                        className="uk-margin-small uk-margin-remove-bottom uk-text-bold main-color"
                        >
                        Login
                        </h5>
                    </li>
                    <li className="uk-padding-small uk-padding-remove-vertical">
                        <i data-lucide="database" className="main-color"></i>
                        <h5
                        className="uk-margin-small uk-margin-remove-bottom uk-text-bold main-color"
                        >
                        Query
                        </h5>
                    </li>
                    <li className="uk-padding-small uk-padding-remove-vertical">
                        <i data-lucide="search" className="main-color"></i>
                        <h5
                        className="uk-margin-small uk-margin-remove-bottom uk-text-bold main-color"
                        >
                        Search
                        </h5>
                    </li>
                    <li
                        className="uk-padding-small uk-padding-remove-vertical uk-border-remove"
                    >
                        <form>
                        <div uk-form-custom="target: > * > span:first-child">
                            <select aria-label="Custom controls">
                            <option value="">EN</option>
                            <option value="1">EN</option>
                            <option value="2">EN</option>
                            <option value="3">EN</option>
                            <option value="4">EN</option>
                            </select>
                            <button
                            className="uk-button uk-button-default uk-border-remove"
                            type="button"
                            tabindex="-1"
                            >
                            <span></span>
                            <span uk-icon="icon: chevron-down"></span>
                            </button>
                        </div>
                        </form>
                        <h5
                        className="uk-margin-small uk-margin-remove-bottom uk-text-bold main-color uk-margin-remove-top"
                        >
                        Lang
                        </h5>
                    </li>
                    </ul>
                </div>
                </div>
            </div>
        </div>

    </>
  )
}
