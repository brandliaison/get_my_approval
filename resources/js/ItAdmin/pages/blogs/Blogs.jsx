import axios from "axios";
import UIkit from "uikit";
import React, { useEffect, useState } from "react";
import { apiurl } from "../../apiurls/apiurls";
import { Link, useNavigate } from "react-router-dom";

export default function Blogs() {

    const navigate = useNavigate();

    const [blogs, setblogs] = useState();

    const deleteblog = (id) => {
        axios
            .delete(`${apiurl}/blogs/${id}`)
            .then((res) => {
                UIkit.notification({
                    message: res.data.message || "Blog deleted successfully!",
                    status: "success",
                    timeout: 1000,
                    pos: "top-center",
                });
                getblogs();
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
    
    const getblogs = () => {
        axios.get(`${apiurl}/blogs`)
            .then((res) => {
                setblogs(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getblogs();
    }, []);


    const handleViewBlog = (id) => {
        navigate(`/cms/editblog/${id}`); // Redirect to second page with blog ID in URL
    };

    console.log(blogs);

    return (
        <>
            <div id="sc-page-wrapper">
                <div id="sc-page-content">
                    <div className="uk-flex uk-flex-right">
                    <Link to="/cms/addblog">
                        <button
                            className="sc-fab sc-fab-text sc-fab-success solid-button"
                        >
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
                        <h3 className="uk-card-title">Blogs</h3>
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
                                            <th>Blog Image</th>
                                            <th>Blog Discription</th>
                                            <th>Blog Name</th>
                                            <th>Blog Title</th>
                                            <th>Edit Blog</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {blogs?.length > 0 ? (
                                            blogs?.map((value, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <input
                                                            className="uk-checkbox sc-js-table-checkbox"
                                                            type="checkbox"
                                                            data-sc-icheck
                                                        />
                                                    </td>
                                                    <td>
                                                        <img
                                                            src={`http://192.168.1.13:8000//${value.image_url}`}
                                                            className="sc-avatar uk-preserve-width"
                                                            alt={value.image_alt}
                                                            style={{borderRadius: '5px', maxWidth: '150px'}}
                                                        />
                                                    </td>
                                                    <td>{value.description}</td>
                                                    <td>{value.name}</td>
                                                    <td>{value.content}</td>
                                                    <td>
                                                        <div onClick={e => deleteblog(value._id)}>
                                                            <a
                                                                className="sc-button sc-button-secondary sc-js-button-wave-light"
                                                                href="#"
                                                            >
                                                                <i className="mdi mdi-trash-can-outline"></i>{" "}
                                                                Delete
                                                            </a>
                                                        </div>
                                                        <div className="uk-margin-top" onClick={() => handleViewBlog(value._id)}>
                                                            <a
                                                                className="sc-button sc-button-primary sc-js-button-wave-light"
                                                                href="#"
                                                            >
                                                                <i className="mdi mdi-file-edit">
                                                                    {" "}
                                                                </i>
                                                                Edit
                                                            </a>
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
