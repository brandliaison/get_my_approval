import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "../../services/api";
import axios from "axios";
import UIkit from "uikit";
import FormattedDate from "../../components/FormattedDate";
import FormatText from "../../components/FormatText";

export default function Tutorials() {
    const navigate = useNavigate();

    const [tutorials, settutorials] = useState();
    const [videourl, setvideourl] = useState();

    const deletetutorial = (id) => {
        apiClient
            .delete(`/tutorial-videos/${id}`)
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
        apiClient
            .get(`/tutorial-videos`)
            .then((res) => {
                settutorials(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        gettutorial();
    }, []);

    const handleViewBlog = (id) => {
        navigate(`/op-admin/edittutorials/${id}`); // Redirect to second page with blog ID in URL
    };

    return (
        <>
            <div id="sc-page-wrapper">
                <div id="sc-page-content">
                    <div className="uk-flex uk-flex-right">
                        <Link to="/op-admin/addtutorials">
                            <button className="sc-fab sc-fab-text sc-fab-success solid-button">
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
                                            <th>Tutorial Name</th>
                                            <th>Category</th>
                                            <th>Status</th>
                                            <th>Approval Status</th>
                                            <th>Date</th>
                                            <th>Action</th>
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
                                                        <img
                                                            src={
                                                                value.thumbnail_url
                                                            }
                                                            className="sc-avatar uk-preserve-width"
                                                            alt="pagac.twila"
                                                            style={{
                                                                maxWidth:
                                                                    "10vw",
                                                                borderRadius: 0,
                                                            }}
                                                            uk-toggle="target: #tutorialvideo"
                                                            onClick={(e) =>
                                                                setvideourl(
                                                                    value.video_url
                                                                )
                                                            }
                                                        />
                                                    </td>
                                                    <td>{value.name}</td>
                                                    <td>
                                                        {value.category.name}
                                                    </td>
                                                    <td className="uk-text-capitalize">
                                                        <FormatText
                                                            text={value.status}
                                                        />
                                                    </td>
                                                    <td className="uk-text-capitalize">
                                                        <FormatText
                                                            text={
                                                                value.approval_status
                                                            }
                                                        />
                                                    </td>
                                                    <td className="uk-text-capitalize">
                                                        <FormattedDate
                                                            getDate={
                                                                value.created_at
                                                            }
                                                        />
                                                    </td>
                                                    <td>
                                                        <div className="uk-flex gap-2">
                                                            <div>
                                                                <Link
                                                                    to={`/op-admin/view-tutorials/${value._id}`}
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
                                                                    className="sc-button sc-button-secondary sc-js-button-wave-light"
                                                                    href="#"
                                                                >
                                                                    <i className="mdi mdi-file-edit"></i>
                                                                </a>
                                                            </div>
                                                            <div
                                                                onClick={(e) =>
                                                                    deletetutorial(
                                                                        value._id
                                                                    )
                                                                }
                                                            >
                                                                <a
                                                                    className="sc-button sc-button-danger sc-js-button-wave-light"
                                                                    href="#"
                                                                >
                                                                    <i className="mdi mdi-trash-can-outline"></i>{" "}
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

            {/* <!-- Modal --> */}
            <div id="tutorialvideo" uk-modal="true">
                <div className="uk-modal-dialog uk-modal-body uk-margin-auto-vertical uk-padding-remove">
                    <iframe src={videourl} width="100%" height="400px"></iframe>
                </div>
            </div>
        </>
    );
}
