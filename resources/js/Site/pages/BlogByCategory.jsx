import React, { useEffect, useState } from "react";
import apiClient from "../services/api";
import { Link, useParams } from "react-router-dom";
import FormattedDate from "../../OpAdmin/components/FormattedDate";

export default function BlogByCategory() {
    const { slug } = useParams();

    const [categories, setCategories] = useState();
    const [data, setData] = useState();

    const getCategories = () => {
        apiClient
            .get(`/active-blog-categories`, {
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
            .get(`/active-blogs-by-category/${slug}`, {
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
    }, [slug]);

    // Separate parent and child categories
    const parentCategories = categories?.filter((cat) => !cat.parent_category);
    const childCategories = categories?.filter((cat) => cat.parent_category);

    return (
        <>
            {/* <!-- turorial top banner section --> */}

            <div className="services-top-banner uk-position-relative">
                <img src="/images/servicebanner.png" className="uk-width-1-1" />
                <div className="inner-page-banner">
                    <h2>Blogs</h2>
                </div>
            </div>

            {/* <!-- turorial main section --> */}

            <div className="services-main uk-padding-large uk-padding-remove-horizontal">
                <div className="custom-container">
                    <div className="uk-grid" uk-grid>
                        <div className="uk-width-1-1 uk-width-1-4@m uk-padding-remove">
                            <div className="left-filters uk-padding uk-margin-top">
                                <h3 className="fontlivvic-bold">
                                    Blog Categories
                                </h3>
                                <ul className="uk-list uk-list-collapse fontlivvic">
                                    {parentCategories?.map((val, i) => (
                                        <li className="active-filter" key={i}>
                                            <i data-lucide="chevron-right"></i>{" "}
                                            <Link
                                                to={
                                                    "/blog-category/" +
                                                    val?.slug
                                                }
                                                onClick={getData}
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
                                                                    "/blog-category/" +
                                                                    child?.slug
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
                            <div
                                className="uk-grid-collapse uk-child-width-1-1@s uk-child-width-1-2@m uk-child-width-1-3@l"
                                uk-grid="true"
                            >
                                {data?.length > 0
                                    ? data?.map((val) => (
                                          <div
                                              className="uk-padding-small uk-padding-remove-top"
                                              key={val?._id}
                                          >
                                              <div className="tutorial-main uk-card uk-card-default">
                                                  <div className="uk-position-relative">
                                                      <img
                                                          src={val?.image_url}
                                                          className="uk-width-1-1"
                                                          style={{
                                                              maxHeight:
                                                                  "150px",
                                                          }}
                                                      />
                                                      <div className="tutorial-play-icon">
                                                          <i
                                                              data-lucide="circle-play"
                                                              className="color-white uk-width-1-1"
                                                          ></i>
                                                      </div>
                                                  </div>
                                                  <div className="uk-padding-small">
                                                      <h3 className="uk-text-bold fourth-color">
                                                          {val?.name}
                                                      </h3>
                                                      <p>{val?.description}</p>

                                                      <div className="uk-margin-top uk-flex gap-2">
                                                          <Link
                                                              to={
                                                                  "/blog/" +
                                                                  val?.slug
                                                              }
                                                              className="uk-button uk-button-primary"
                                                          >
                                                              Read More
                                                          </Link>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>
                                      ))
                                    : "Data Not Found"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <!-- query banner --> */}

            <div className="home-query-banner">
                <div className="custom-container">
                    <div
                        className="uk-grid-collapse uk-child-width-1-1@s uk-child-width-1-2@l uk-flex-bottom"
                        uk-grid
                    >
                        <div>
                            <img src="/images/querybanner.png" />
                        </div>
                        <div className="uk-text-center">
                            <h1 className="color-white uk-text-bold">
                                Help For Compliance Solution
                            </h1>
                            <h2 className="uk-margin-remove color-white uk-text-bold">
                                Join Us as a Industry Partner
                            </h2>
                            <img src="/images/icons/phone.png" />
                            <h3 className="color-white uk-text-large uk-margin-remove">
                                CALL US 24/7
                            </h3>
                            <h3 className="uk-margin-small-vertical uk-text-large color-white uk-text-bold">
                                +91-8130615678
                            </h3>
                            <button className="border-button uk-margin-large-bottom">
                                {" "}
                                Contact Us <i data-lucide="chevrons-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
