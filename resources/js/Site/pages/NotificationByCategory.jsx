import React, { useEffect, useState } from "react";
import apiClient from "../services/api";
import { Link, useParams } from "react-router-dom";
import FormattedDate from "../../OpAdmin/components/FormattedDate";

export default function NotificationByCategory() {

    const {slug} = useParams();

    const [categories, setCategories] = useState();
    const [data, setData] = useState();

    const getCategories = () => {
        apiClient
            .get(`/active-notifications-by-category`, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                setCategories(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getData = () => {
        apiClient
            .get(`/active-notifications-by-category/${slug}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                setData(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getCategories();
        getData();
    }, []);

    // Separate parent and child categories
    const parentCategories = categories?.filter((cat) => !cat.parent_category);
    const childCategories = categories?.filter((cat) => cat.parent_category);

    return (
        <>
            {/* <!-- Notifications top banner section --> */}

            <div className="services-top-banner uk-position-relative">
                <img src="/images/servicebanner.png" className="uk-width-1-1" />
                <div className="inner-page-banner">
                    <h2>Notifications</h2>
                </div>
            </div>

            {/* <!-- Notifications main section --> */}

            <div className="services-main uk-padding-large uk-padding-remove-horizontal">
                <div className="custom-container">
                    <div className="uk-grid" uk-grid>
                        <div className="uk-width-1-1 uk-width-1-4@m uk-padding-remove">
                            <div className="left-filters uk-padding uk-margin-top">
                                <h3 className="fontlivvic-bold">
                                    Notification Categories
                                </h3>
                                <ul className="uk-list uk-list-collapse fontlivvic">
                                    {parentCategories?.map((val, i) => (
                                        <li className="active-filter" key={i}>
                                            <i data-lucide="chevron-right"></i>{" "}
                                            <Link
                                                to={
                                                    "/notification-category/" +
                                                    val?.slug
                                                }
                                            >
                                                {val?.name}
                                            </Link>
                                            <ul>
                                                {childCategories
                                                    ?.filter(
                                                        (child) =>
                                                            child.parent_category ===
                                                            val._id
                                                    )
                                                    ?.map((child) => (
                                                        <li
                                                            key={child._id}
                                                            style={{
                                                                marginLeft:
                                                                    "20px",
                                                            }}
                                                        >
                                                            <Link
                                                                to={
                                                                    "/notification-category/" +
                                                                    val?.slug
                                                                }
                                                            >
                                                                -- {child.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                            </ul>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="left-filters uk-padding uk-margin-top">
                                <h3 className="fontlivvic-bold">Downloads</h3>
                                <div className="uk-flex uk-flex-between uk-margin-bottom">
                                    <div>
                                        <img src="/images/icons/pdf-icon.png" />
                                        <p className="uk-display-inline-block fontlivvic">
                                            Our Brochure
                                        </p>
                                    </div>
                                    <i
                                        data-lucide="download"
                                        className="third-color"
                                    ></i>
                                </div>
                                <div className="uk-flex uk-flex-between">
                                    <div>
                                        <img src="/images/icons/pdf-icon.png" />
                                        <p className="uk-display-inline-block fontlivvic">
                                            Our Brochure
                                        </p>
                                    </div>
                                    <i
                                        data-lucide="download"
                                        className="third-color"
                                    ></i>
                                </div>
                            </div>
                        </div>

                        <div className="uk-width-1-1 uk-width-3-4@m">
                            <table className="uk-table uk-table-striped">
                                <thead>
                                    <tr>
                                        <th>Notification</th>
                                        <th>Category</th>
                                        <th>Last Modified</th>
                                        <th>View Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data?.length > 0
                                        ? data?.map((val) => (
                                              <tr>
                                                  <td>
                                                      <h5 className="uk-margin-remove">
                                                          {val.name}
                                                      </h5>
                                                  </td>
                                                  <td className="uk-flex">
                                                      <p>{val.category.name}</p>
                                                  </td>
                                                  <td>
                                                      <p>
                                                          <FormattedDate
                                                              getDate={
                                                                  val.created_at
                                                               }
                                                          />
                                                      </p>
                                                  </td>
                                                  <td>
                                                      <Link
                                                          to={
                                                              "/notification-details/" +
                                                              val.slug
                                                          }
                                                      >View Details</Link>
                                                  </td>
                                              </tr>
                                          ))
                                        : "Data Not Found"}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
