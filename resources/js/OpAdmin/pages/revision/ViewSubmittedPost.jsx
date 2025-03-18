import React, { useEffect, useState } from "react";
import apiClient from "../../services/api";
import axios from "axios";
import UIkit from "uikit";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function ViewSubmittedPost() {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();

    const [data, setData] = useState();

    const getEntityList = async () => {
        const revData = { entity_id: id };
        try {
            const response = await apiClient.post("/entity-revisions", revData);
            setData(response.data);
        } catch (error) {
            console.log(error);

            UIkit.notification({
                message: "Failed to load data!",
                status: "danger",
                timeout: 1000,
                pos: "top-center",
            });
        }
    };

    useEffect(() => {
        getEntityList();
    }, []);

    if (!data?.data > 0) {
        return "Loading...";
    }

    const date = new Date(data?.data[0]?.entity_data?.created_at);
    const formattedDate = date.toLocaleString("en-IN");

    console.log(data?.data);

    return (
        <>
            <div id="sc-page-wrapper">
                <div id="sc-page-content">
                    <div className="uk-flex uk-flex-right"></div>

                    <div className="uk-card uk-margin">
                        <div className="uk-flex uk-flex-between uk-flex-middle uk-padding-small">
                            <h3 className="uk-card-title">
                                Post Revision for:{" "}
                                {data?.data[0]?.entity_data?.name}
                            </h3>

                            <div>
                                <button class="uk-button solid-button uk-border-pill" uk-toggle="target: #add_review" type="button">Add Review</button>
                                <button class="uk-button uk-button-primary uk-border-pill" uk-toggle="target: #approve" type="button">Approve</button>
                                <button class="uk-button uk-button-danger uk-border-pill" uk-toggle="target: #reject" type="button">Reject</button>
                            </div>
                        </div>

                        <div className="uk-card-body">
                            <div className="uk-overflow-auto">
                                <h2>Latest Post Revision Details</h2>
                                <table className="uk-table uk-table-hover uk-table-middle uk-table-divider">
                                            <tbody>
                                                <tr>
                                                    <td className="uk-width-1-6">Name</td>
                                                    <td>
                                                        {
                                                            data?.data[0]
                                                                ?.entity_data
                                                                ?.name
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Slug</td>
                                                    <td>
                                                        {
                                                            data?.data[0]
                                                                ?.entity_data
                                                                ?.slug
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Description</td>
                                                    <td>
                                                        {
                                                            data?.data[0]
                                                                ?.entity_data
                                                                ?.description
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>From Platform</td>
                                                    <td>
                                                        {
                                                            data?.data[0]
                                                                ?.entity_data
                                                                ?.from_platform
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Created By</td>
                                                    <td>
                                                        {
                                                            data?.data[0]
                                                                ?.entity_data
                                                                ?.created_by_user
                                                                ?.name
                                                        }
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Created Date</td>
                                                    <td>{formattedDate}</td>
                                                </tr>
                                            </tbody>
                                </table>

                                <div className="uk-margin-top">
                                    <h2>Post Revisions</h2>
                                    <div>
                                        {data?.data.length > 0
                                            ? data?.data.map((value, index) => {
                                                  const date = new Date(
                                                      value.created_at
                                                  );

                                                  // Example: Simple readable format
                                                  const formattedDate =
                                                      date.toLocaleString(
                                                          "en-IN"
                                                      );
                                                  return (
                                                      <div key={index} className="uk-padding-small uk-margin-bottom" style={{border: "1px solid #ccc"}}>
                                                          <div className="uk-margin-bottom" >
                                                              Date:{" "} {formattedDate}
                                                          </div>
                                                          <div className="uk-flex gap-6">
                                                            <div className="uk-width-1-2">
                                                              <b>New Data</b>
                                                                <table className="uk-table uk-table-hover uk-table-middle uk-table-divider">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td className="uk-width-1-4">Name</td>
                                                                            <td>
                                                                                {value.new_data?.name}
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                Slug
                                                                            </td>
                                                                            <td>
                                                                                {value.new_data?.slug}
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                Description
                                                                            </td>
                                                                            <td>
                                                                                {value.new_data?.description}
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                Revised By
                                                                            </td>
                                                                            <td>
                                                                                {value.revised_user?.name}
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                              </div>

                                                              <div className="uk-width-1-2">
                                                              <b>Old Data</b>
                                                                <table className="uk-table uk-table-hover uk-table-middle uk-table-divider">
                                                                    <tbody>
                                                                        <tr>
                                                                            <td className="uk-width-1-4">Name</td>
                                                                            <td>
                                                                                {value.old_data?.name}
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                Slug
                                                                            </td>
                                                                            <td>
                                                                                {value.old_data?.slug}
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                Description
                                                                            </td>
                                                                            <td>
                                                                                {value.old_data?.description}
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>
                                                                                Revised By
                                                                            </td>
                                                                            <td>
                                                                                {value.revised_user?.name}
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                              </div>
                                                          </div>
                                                      </div>
                                                  );
                                              })
                                            : "Data Not Found"}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div id="add_review" uk-modal="true">
                            <div class="uk-modal-dialog uk-modal-body">
                                <h2 class="uk-modal-title"></h2>
                                <button class="uk-modal-close" type="button"></button>
                            </div>
                        </div>

                        <div id="approve" uk-modal="true">
                            <div class="uk-modal-dialog uk-modal-body">
                                <h2 class="uk-modal-title"></h2>
                                <button class="uk-modal-close" type="button"></button>
                            </div>
                        </div>

                        <div id="reject" uk-modal="true">
                            <div class="uk-modal-dialog uk-modal-body">
                                <h2 class="uk-modal-title"></h2>
                                <button class="uk-modal-close" type="button"></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
