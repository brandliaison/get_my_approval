import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiurl } from "../../../apiurls/apiurls";
import UIkit from "uikit";

export default function ServiceCategories() {
    const navigate = useNavigate();

    const [categories, setCategories] = useState();

    const deleteCategory = (id) => {
        axios
            .delete(`${apiurl}/service-categories/${id}`)
            .then((res) => {
                UIkit.notification({
                    message:
                        res.data.message || "Category deleted successfully!",
                    status: "success",
                    timeout: 1000,
                    pos: "top-center",
                });
                getCategories();
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

    const getCategories = () => {
        axios
            .get(`${apiurl}/service-categories`, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                setCategories(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getCategories();
    }, []);

    const handleViewBlog = (id) => {
        navigate(`/cms/editblogcategory/${id}`); // Redirect to second page with blog ID in URL
    };

    console.log(categories);

    return (
        <>
            <div id="sc-page-wrapper">
                <div id="sc-page-content">
                    <div className="uk-flex uk-flex-between uk-flex-middle">
                        <h3>Service Categories</h3>
                        <Link to="/cms/add-service-categories">
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
                                            <th>Discription</th>
                                            <th>Name</th>
                                            <th>Title</th>
                                            <th>Status</th>
                                            <th>Approval Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories?.length > 0 ? (
                                            categories?.map((value, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <input
                                                            className="uk-checkbox sc-js-table-checkbox"
                                                            type="checkbox"
                                                            data-sc-icheck
                                                        />
                                                    </td>
                                                    <td>{value.description}</td>
                                                    <td>{value.name}</td>
                                                    <td>{value.title}</td>
                                                    <td className="uk-text-capitalize">
                                                        {value.status}
                                                    </td>
                                                    <td className="uk-text-capitalize">
                                                        {value.approval_status}
                                                    </td>
                                                    <td>
                                                        <div className="uk-flex gap-2">
                                                            <div
                                                                onClick={(e) =>
                                                                    deleteCategory(
                                                                        value._id
                                                                    )
                                                                }
                                                            >
                                                                <a
                                                                    className="sc-button sc-button-secondary sc-js-button-wave-light"
                                                                    href="#"
                                                                >
                                                                    <i className="mdi mdi-trash-can-outline"></i>{" "}
                                                                </a>
                                                            </div>
                                                            <div
                                                                onClick={() =>
                                                                    handleViewBlog(
                                                                        value._id
                                                                    )
                                                                }
                                                            >
                                                                <a
                                                                    className="sc-button sc-button-primary sc-js-button-wave-light"
                                                                    href="#"
                                                                >
                                                                    <i className="mdi mdi-file-edit">
                                                                        {" "}
                                                                    </i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
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
