import React, { useEffect, useState } from "react";
import apiClient from "../frontservices/api";
import { Link, useParams } from "react-router-dom";

export default function ServicesByCategory() {
    const { slug } = useParams();

    const [serviceCategories, setServiceCategories] = useState();
    const [services, setServices] = useState();

    const getServiceCategories = () => {
        apiClient
            .get(`/active-service-categories`, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                setServiceCategories(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getServices = () => {
        apiClient
            .get(`/active-services-by-category/${slug}`, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                setServices(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getServiceCategories();
        getServices();
    }, [slug]);

    // Separate parent and child categories
    const parentCategories = serviceCategories?.filter(
        (cat) => !cat.parent_category
    );
    const childCategories = serviceCategories?.filter(
        (cat) => cat.parent_category
    );
    console.log(childCategories);

    return (
        <>
            {/* <!-- services top banner section --> */}

            <div className="services-top-banner uk-position-relative">
                <img
                    src="./images/servicebanner.png"
                    className="uk-width-1-1"
                />
                <div className="inner-page-banner">
                    <h2>Solutions</h2>
                </div>
            </div>

            {/* <!-- services main section --> */}

            <div className="services-main uk-padding-large uk-padding-remove-horizontal">
                <div className="custom-container">
                    <div className="uk-grid" uk-grid>
                        <div className="uk-width-1-1 uk-width-1-4@m uk-padding-remove">
                            <div className="left-filters uk-padding uk-margin-top">
                                <h3 className="fontlivvic-bold">
                                    Solution Categories
                                </h3>
                                <ul className="uk-list uk-list-collapse fontlivvic">
                                    {parentCategories?.map((val, i) => (
                                        <li className="active-filter" key={i}>
                                            <i data-lucide="chevron-right"></i>{" "}
                                            <Link
                                                to={
                                                    "/service-category/" +
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
                                                                    "/service-category/" +
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
                                        <img src="./images/icons/pdf-icon.png" />
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
                                        <img src="./images/icons/pdf-icon.png" />
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
                                {services?.length > 0
                                    ? services?.map((ser) => (
                                          <div className="uk-padding-small">
                                              <div className="uk-card uk-card-default uk-card-body servicecard uk-padding-small">
                                                  <div className="uk-flex uk-flex-middle">
                                                      <img
                                                          src={ser?.image_url}
                                                          height={80}
                                                          width={80}
                                                      />
                                                      <div className="uk-margin-left">
                                                          <h5 className="uk-text-bold uk-margin-remove fourth-color">
                                                              {ser?.name}
                                                          </h5>
                                                          <p className="fourth-color">
                                                              {
                                                                  ser?.compliance_header
                                                              }
                                                          </p>
                                                      </div>
                                                  </div>
                                                  <p className="uk-margin-top">
                                                      {ser?.description}
                                                  </p>
                                                  <div className="uk-margin-top">
                                                      <Link
                                                          to={"/services/"+ser?.slug}
                                                          className="border-button"
                                                      >
                                                          Read More{" "}
                                                          <i data-lucide="chevrons-right"></i>
                                                      </Link>
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
                            <img src="./images/querybanner.png" />
                        </div>
                        <div className="uk-text-center">
                            <h1 className="color-white uk-text-bold">
                                Help For Compliance Solution
                            </h1>
                            <h2 className="uk-margin-remove color-white uk-text-bold">
                                Join Us as a Industry Partner
                            </h2>
                            <img src="./images/icons/phone.png" />
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
