import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../../services/api";
import UIkit from "uikit";
import FormattedDate from "../../../components/FormattedDate";

export default function BlogCategories() {
    const navigate = useNavigate();

    const [blogcategories, setblogcategories] = useState();

    const deleteblogcategory = (id) => {
        apiClient
            .delete(`/blog-categories/${id}`)
            .then((res) => {
                UIkit.notification({
                    message: res.data.message || "Blog deleted successfully!",
                    status: "success",
                    timeout: 1000,
                    pos: "top-center",
                });
                getblogcategories();
            })
            .catch((err) => {
                console.log(err);

                UIkit.notification({
                    message: "Failed to delete blog!",
                    status: "danger",
                    timeout: 1000,
                    pos: "top-center",
                });
            });
    };

    const getblogcategories = () => {
        apiClient
            .get(`/blog-categories`)
            .then((res) => {
                setblogcategories(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getblogcategories();
    }, []);

    const handleViewBlog = (id) => {
        navigate(`/service-partner/editblogcategory/${id}`); // Redirect to second page with blog ID in URL
    };

    console.log(blogcategories);

    return (
        <>
            <div id="sc-page-wrapper">
                <div id="sc-page-content">
                    <div className="uk-flex uk-flex-right">
                        <Link to="/service-partner/addblog-categories">
                            <button className="sc-fab sc-fab-text sc-fab-success solid-button">
                                <i className="mdi mdi-plus"></i>Create
                            </button>
                        </Link>
                    </div>

                    <form
                        className="uk-search uk-search-default uk-width-1-1 uk-background-default uk-border-rounded uk-flex uk-flex-middle uk-margin-top"
                        style={{ padding: "10px 15px" }}
                    >
                        <span
                            style={{
                                color: "gray",
                                fontSize: "24px",
                                padding: "5px",
                            }}
                        >
                            <i className="mdi mdi-magnify"></i>
                        </span>
                        <input
                            className="uk-search-input uk-width-1-1 uk-background-default uk-border-none"
                            type="search"
                            placeholder="Search..."
                            style={{ border: "none" }}
                        />
                    </form>

                    <div className="uk-card uk-margin">
                        <h3 className="uk-card-title">Blog Categories</h3>
                        <div className="uk-card-body">
                            <div className="uk-overflow-auto">
                                <table className="uk-table uk-table-hover uk-table-middle uk-table-divider">
                                    <thead>
                                        <tr>
                                            <th>
                                                <input
                                                    className="uk-checkbox sc-main-checkbox"
                                                    type="checkbox"
                                                    data-sc-icheck
                                                    data-group=".sc-js-table-checkbox"
                                                />
                                            </th>
                                            <th>Categories Name</th>
                                            <th>Categories Discription</th>
                                            <th>Parent Category</th>
                                            <th>Status</th>
                                            <th>Approval Status</th>
                                            <th>Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {blogcategories?.data?.length > 0 ? (
                                            blogcategories?.data?.map(
                                                (value, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <input
                                                                className="uk-checkbox sc-js-table-checkbox"
                                                                type="checkbox"
                                                                data-sc-icheck
                                                            />
                                                        </td>
                                                        <td>{value.name}</td>
                                                        <td>
                                                            {value.description.slice(
                                                                0,
                                                                50
                                                            )}
                                                            ...
                                                        </td>
                                                        <td>
                                                            {
                                                                value
                                                                    ?.parent_cat
                                                                    ?.name
                                                            }
                                                        </td>
                                                        <td className="uk-text-capitalize">
                                                            {value.status}
                                                        </td>
                                                        <td className="uk-text-capitalize">
                                                            {
                                                                value.approval_status
                                                            }
                                                        </td>
                                                        <td className="uk-text-capitalize">
                                                            {
                                                                <FormattedDate
                                                                    getDate={
                                                                        value.created_at
                                                                    }
                                                                />
                                                            }
                                                        </td>
                                                        <td>
                                                            <div className="uk-flex gap-2">
                                                                <div>
                                                                    <Link
                                                                        to={`/service-partner/view-blog-category/${value._id}`}
                                                                        className="sc-button sc-button-primary sc-js-button-wave-light"
                                                                    >
                                                                        <i className="mdi mdi-eye"></i>
                                                                    </Link>
                                                                </div>
                                                                <div
                                                                    onClick={() =>
                                                                        handleViewBlog(
                                                                            value._id
                                                                        )
                                                                    }
                                                                >
                                                                    <a
                                                                        className="sc-button sc-button-danger sc-js-button-wave-light"
                                                                        href="#"
                                                                    >
                                                                        <i className="mdi mdi-file-edit"></i>
                                                                    </a>
                                                                </div>
                                                                <div
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        deleteblogcategory(
                                                                            value._id
                                                                        )
                                                                    }
                                                                >
                                                                    <a
                                                                        className="sc-button sc-button-secondary sc-js-button-wave-light"
                                                                        href="#"
                                                                    >
                                                                        <i className="mdi mdi-trash-can-outline"></i>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            )
                                        ) : (
                                            <tr>
                                                <td>
                                                    <p>No blogs available.</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
