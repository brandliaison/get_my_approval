import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <>
        
            <aside id="sc-sidebar-main" className="sc-sidebar-info-fixed">
                <div className="uk-offcanvas-bar">
                    <div
                        className="sc-sidebar-main-scrollable"
                        data-sc-scrollbar="visible-y"
                    >
                        <ul className="sc-sidebar-menu uk-nav">
                            <li className="sc-sidebar-menu-heading">
                                <span>Pages</span>
                            </li>

                            <li title="Chat">
                                <Link to="/cms/">
                                    <span className="uk-nav-icon">
                                        <i className="mdi mdi-home"></i>
                                    </span>
                                    <span className="uk-nav-title">Home</span>
                                </Link>
                            </li>

                            <li title="Invoices">
                                <Link to="/cms/services">
                                    <span className="uk-nav-icon">
                                        <i className="mdi mdi-toolbox-outline"></i>
                                    </span>
                                    <span className="uk-nav-title">
                                        Services
                                    </span>
                                </Link>
                            </li>

                            <li title="Mailbox">
                                <Link to="/cms/products">
                                    <span className="uk-nav-icon">
                                        <i className="mdi mdi-package-variant-remove"></i>
                                    </span>
                                    <span className="uk-nav-title">
                                        Products
                                    </span>
                                </Link>
                            </li>

                            <li title="Task Board">
                                <Link to="/cms/notifictaions">
                                    <span className="uk-nav-icon">
                                        <i className="mdi mdi-bell"></i>
                                    </span>
                                    <span className="uk-nav-title">
                                        Notifictaions
                                    </span>
                                </Link>
                            </li>

                            <li title="Notes">
                                <Link to="/cms/tutorials">
                                    <span className="uk-nav-icon">
                                        <i className="mdi mdi-video-account"></i>
                                    </span>
                                    <span className="uk-nav-title">Tutorials</span>
                                </Link>
                            </li>

                            <li title="Notes">
                                <Link to="/cms/blogs">
                                    <span className="uk-nav-icon">
                                        <i className="mdi mdi-post-outline"></i>
                                    </span>
                                    <span className="uk-nav-title">Blogs</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="sc-sidebar-info">© 2025 Brand Liaison. All rights reserved.</div>
                </div>
            </aside>
        </>
    );
}
