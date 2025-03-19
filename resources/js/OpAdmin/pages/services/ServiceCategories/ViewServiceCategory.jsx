import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../../../services/api";
import UIkit from "uikit";
import FormatText from "../../../components/FormatText";

export default function ViewServiceCategory() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setformData] = useState({
        name: "",
        description: "",
        title: "",
        slug: "",
    });

    // Handle text input changes
    const handleChange = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        editblogcategory();
    }, []);

    const editblogcategory = () => {
        apiClient
            .get(`/service-categories/${id}`)
            .then((res) => {
                setformData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
            <div id="sc-page-wrapper">
                <div id="sc-page-content">
                    <div className="uk-child-width-1-1@l" data-uk-grid>
                        <div>
                            <div className="uk-card">
                                <div className="uk-card-body">
                                    <h5 className="uk-heading-line">
                                        <span>Service Category Details</span>
                                    </h5>

                                    <fieldset className="uk-fieldset">
                                        <h2>{formData.name}</h2>
                                        <div>
                                            <div>
                                                <b>Slug:</b>
                                            </div>
                                            {formData.slug}
                                        </div>
                                        <div className="uk-margin">
                                            <div>
                                                <b>Title:</b>
                                            </div>
                                            {formData.title}
                                        </div>
                                        <div className="uk-margin">
                                            <div>
                                                <b>Description:</b>
                                            </div>
                                            {formData.description}
                                        </div>
                                    </fieldset>

                                    <div className="uk-margin-top">
                                        <h2>Post Revisions</h2>
                                        <div>
                                            {formData?.revisions?.length > 0
                                                ? formData?.revisions.map(
                                                      (value, index) => {
                                                          const date = new Date(
                                                              value.created_at
                                                          );
                                                          const formattedDate =
                                                              date.toLocaleString(
                                                                  "en-IN"
                                                              );
                                                          return (
                                                              <div
                                                                  key={index}
                                                                  className="uk-padding-small uk-margin-bottom"
                                                                  style={{
                                                                      border: "1px solid #ccc",
                                                                  }}
                                                              >
                                                                  <div className="uk-margin-bottom">
                                                                      Date:{" "}
                                                                      {
                                                                          formattedDate
                                                                      }
                                                                  </div>
                                                                  <div className="uk-flex gap-6">
                                                                      <div className="uk-width-1-2">
                                                                          <b>
                                                                              New
                                                                              Data
                                                                          </b>
                                                                          <table className="uk-table uk-table-hover uk-table-middle uk-table-divider">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td className="uk-width-1-4">
                                                                                          Name
                                                                                      </td>
                                                                                      <td>
                                                                                          {
                                                                                              value
                                                                                                  .new_data
                                                                                                  ?.name
                                                                                          }
                                                                                      </td>
                                                                                  </tr>
                                                                                  <tr>
                                                                                      <td>
                                                                                          Slug
                                                                                      </td>
                                                                                      <td>
                                                                                          {
                                                                                              value
                                                                                                  .new_data
                                                                                                  ?.slug
                                                                                          }
                                                                                      </td>
                                                                                  </tr>
                                                                                  <tr>
                                                                                      <td>
                                                                                          Description
                                                                                      </td>
                                                                                      <td>
                                                                                          {
                                                                                              value
                                                                                                  .new_data
                                                                                                  ?.description
                                                                                          }
                                                                                      </td>
                                                                                  </tr>
                                                                                  <tr>
                                                                                      <td>
                                                                                          Revised
                                                                                          By
                                                                                      </td>
                                                                                      <td>
                                                                                          {
                                                                                              value
                                                                                                  .revised_user
                                                                                                  ?.name
                                                                                          }
                                                                                      </td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </div>

                                                                      <div className="uk-width-1-2">
                                                                          <b>
                                                                              Old
                                                                              Data
                                                                          </b>
                                                                          <table className="uk-table uk-table-hover uk-table-middle uk-table-divider">
                                                                              <tbody>
                                                                                  <tr>
                                                                                      <td className="uk-width-1-4">
                                                                                          Name
                                                                                      </td>
                                                                                      <td>
                                                                                          {
                                                                                              value
                                                                                                  .old_data
                                                                                                  ?.name
                                                                                          }
                                                                                      </td>
                                                                                  </tr>
                                                                                  <tr>
                                                                                      <td>
                                                                                          Slug
                                                                                      </td>
                                                                                      <td>
                                                                                          {
                                                                                              value
                                                                                                  .old_data
                                                                                                  ?.slug
                                                                                          }
                                                                                      </td>
                                                                                  </tr>
                                                                                  <tr>
                                                                                      <td>
                                                                                          Description
                                                                                      </td>
                                                                                      <td>
                                                                                          {
                                                                                              value
                                                                                                  .old_data
                                                                                                  ?.description
                                                                                          }
                                                                                      </td>
                                                                                  </tr>
                                                                                  <tr>
                                                                                      <td>
                                                                                          Revised
                                                                                          By
                                                                                      </td>
                                                                                      <td>
                                                                                          {
                                                                                              value
                                                                                                  .revised_user
                                                                                                  ?.name
                                                                                          }
                                                                                      </td>
                                                                                  </tr>
                                                                              </tbody>
                                                                          </table>
                                                                      </div>
                                                                  </div>

                                                                  <div>
                                                                      <b>
                                                                          Reviews
                                                                      </b>
                                                                  </div>
                                                                  <div className="uk-flex gap-6">
                                                                      {value?.reviews?.map(
                                                                          (
                                                                              val,
                                                                              i
                                                                          ) => {
                                                                              const date =
                                                                                  new Date(
                                                                                      val.created_at
                                                                                  );
                                                                              const fdate =
                                                                                  date.toLocaleString(
                                                                                      "en-IN"
                                                                                  );
                                                                              return (
                                                                                  <div class="uk-card uk-card-default uk-card-body uk-width-1-4@m">
                                                                                      <p className="uk-text-small uk-remove-padding">
                                                                                          Date{" "}
                                                                                          {
                                                                                              fdate
                                                                                          }
                                                                                      </p>
                                                                                      <div>
                                                                                          Comment:{" "}
                                                                                          {
                                                                                              val.review_comment
                                                                                          }
                                                                                      </div>
                                                                                      <p className="uk-text-small">
                                                                                          Status:{" "}
                                                                                          <FormatText
                                                                                              text={
                                                                                                  val.review_status
                                                                                              }
                                                                                          />
                                                                                      </p>
                                                                                  </div>
                                                                              );
                                                                          }
                                                                      )}
                                                                  </div>
                                                              </div>
                                                          );
                                                      }
                                                  )
                                                : "Data Not Found"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
