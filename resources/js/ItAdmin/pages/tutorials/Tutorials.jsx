import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiurl } from "../../apiurls/apiurls";
import axios from "axios";
import UIkit from "uikit";

export default function Tutorials() {

    const navigate = useNavigate();

    const [tutorials, settutorials] = useState();

    const deletetutorial = (id) => {
        axios
            .delete(`${apiurl}/tutorial-videos/${id}`)
            .then((res) => {
                UIkit.notification({
                    message: res.data.message || "Blog deleted successfully!",
                    status: "success",
                    timeout: 1000,
                    pos: "top-center",
                });
                gettutorial();
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
    
    const gettutorial = () => {
        axios.get(`${apiurl}/tutorial-videos`)
            .then((res) => {
                settutorials(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        gettutorial();
    }, []);


    const handleViewBlog = (id) => {
        navigate(`/cms/editblogcategory/${id}`); // Redirect to second page with blog ID in URL
    };

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

                    <div className="uk-card uk-margin">
                        <h3 className="uk-card-title">Tutorials</h3>
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
                                            <th>Thumbnail</th>
                                            <th>Tutorial Discription</th>
                                            <th>Tutorial Name</th>
                                            <th>Tutorial Content</th>
                                            <th>Edit Tutorial</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tutorials?.length > 0 ? (
                                                tutorials?.map((value, index) => (
                                                <tr key={index}>
                                                    <td className="td">
                                                        <input
                                                            className="uk-checkbox sc-js-table-checkbox"
                                                            type="checkbox"
                                                            data-sc-icheck
                                                        />
                                                    </td>
                                                    <td>
                                                        <img src={`http://192.168.1.13:8000//${value.thumbnail_url}`} className="sc-avatar uk-preserve-width"
                                                            alt="pagac.twila"
                                                            style={{maxWidth: '10vw', borderRadius: 0}}/>
                                                    </td>
                                                    <td>{value.description}</td>
                                                    <td>{value.name}</td>
                                                    <td>{value.content}</td>
                                                    <td>
                                                        <div onClick={e => deletetutorial(value._id)}>
                                                            <a
                                                                className="sc-button sc-button-secondary sc-js-button-wave-light"
                                                                href="#"
                                                            >
                                                                <i className="mdi mdi-trash-can-outline"></i>{" "}
                                                                Delete
                                                            </a>
                                                        </div>
                                                        <div className="uk-margin-top">
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

            {/* form on modal  */}
            <div id="modal-overflow" data-uk-modal>
                <div className="uk-modal-dialog">
                    <button
                        className="uk-modal-close-default"
                        type="button"
                        data-uk-close
                    ></button>
                    <div className="uk-modal-header">
                        <h2 className="uk-modal-title uk-text-bold">
                            Edit Blog Category
                        </h2>
                    </div>
                    <div className="uk-modal-body" data-uk-overflow-auto>
                        <p className="uk-modal-title uk-text-medium">
                            Edit the details of the blog category.
                        </p>
                        <form className="uk-form-stacked">
                            {/* <!-- Name --> */}
                            <div className="uk-margin-small-bottom">
                                <label className="uk-form-label" for="name">
                                    Name*
                                </label>
                                <input
                                    className="uk-input"
                                    id="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>

                            {/* <!-- Title --> */}
                            <div className="uk-margin-small-bottom">
                                <label className="uk-form-label" for="title">
                                    Title*
                                </label>
                                <input
                                    className="uk-input"
                                    id="title"
                                    type="text"
                                    placeholder="Enter title"
                                    required
                                />
                            </div>

                            {/* <!-- Slug --> */}
                            <div className="uk-margin-small-bottom">
                                <label className="uk-form-label" for="slug">
                                    Slug*
                                </label>
                                <input
                                    className="uk-input"
                                    id="slug"
                                    type="text"
                                    placeholder="Enter slug"
                                    required
                                />
                            </div>

                            {/* <!-- File Upload --> */}
                            <div className="uk-margin-small-bottom">
                                <label className="uk-form-label" for="file">
                                    Upload File
                                </label>
                                <div className="uk-form-controls">
                                    <input
                                        className="uk-input"
                                        id="file"
                                        type="file"
                                    />
                                </div>
                            </div>

                            {/* <!-- Description (Textarea) --> */}
                            <div className="uk-margin-small-bottom">
                                <label className="uk-form-label" for="description">
                                    Description*
                                </label>
                                <textarea
                                    className="uk-textarea"
                                    id="description"
                                    placeholder="Enter description"
                                    rows="4"
                                ></textarea>
                            </div>
                        </form>
                    </div>
                    <hr className="uk-margin-remove" />
                    <div className="uk-modal-footer">
                        <button
                            className="sc-button sc-button-success"
                            type="button"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
