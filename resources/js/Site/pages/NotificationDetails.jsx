import React, { useEffect, useState } from "react";
import apiClient from "../services/api";
import { Link, useParams } from "react-router-dom";
import FormattedDate from "../../OpAdmin/components/FormattedDate";

export default function NotificationDetails() {
    const { slug } = useParams();

    const [categories, setCategories] = useState();
    const [data, setData] = useState();

    const getCategories = () => {
        apiClient
            .get(`/active-notification-categories`, {
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
            .get(`/active-notification-details/${slug}`, {
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

    console.log(data);

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
                            <h1>{data?.name}</h1>

                            <div className="uk-margin-top">
                                {data?.description}
                            </div>

                            <div className="uk-margin-top">
                                <a
                                    href={data?.image_url}
                                    download={true}
                                    className="uk-button uk-button-primary"
                                >
                                    Download PDF
                                </a>
                            </div>

                            <div className="uk-grid-collapse uk-child-width-1-1">
                                <div className="uk-flex uk-flex-wrap">
                                    <div className="uk-width-1-2">
                                        <div className="uk-padding-small">
                                            <div className="uk-card uk-card-default uk-card-body uk-padding-small">
                                                <h5 className="uk-text-bold uk-margin-remove fourth-color">
                                                    Related Blogs
                                                </h5>

                                                <div className="uk-grid-collapse uk-child-width-1-1 uk-margin-top">
                                                    {data?.blogs?.map((val) => (
                                                        <div key={val?._id}>
                                                            <div className="uk-flex gap-6 uk-margin-bottom">
                                                                <div>
                                                                    <Link
                                                                        to={
                                                                            "/blog/" +
                                                                            val?.slug
                                                                        }
                                                                    >
                                                                        <img
                                                                            src={
                                                                                val?.image_url
                                                                            }
                                                                            style={{
                                                                                maxHeight:
                                                                                    "100px",
                                                                                maxWidth:
                                                                                    "100px",
                                                                            }}
                                                                        />
                                                                    </Link>
                                                                </div>
                                                                <div>
                                                                    {" "}
                                                                    <Link
                                                                        to={
                                                                            "/blog/" +
                                                                            val?.slug
                                                                        }
                                                                    >
                                                                        <h5 className="uk-text-bold uk-margin-remove">
                                                                            {
                                                                                val?.name
                                                                            }
                                                                        </h5>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="uk-width-1-2">
                                        <div className="uk-padding-small">
                                            <div className="uk-card uk-card-default uk-card-body uk-padding-small">
                                                <h5 className="uk-text-bold uk-margin-remove fourth-color">
                                                    Medatory Products
                                                </h5>

                                                <div
                                                    className="uk-grid-collapse uk-child-width-1-1 uk-margin-top"
                                                    uk-grid="true"
                                                >
                                                    {data?.products?.map(
                                                        (val) => (
                                                            <div key={val?._id}>
                                                                <div className="uk-flex gap-6 uk-margin-bottom">
                                                                    <div>
                                                                        <Link
                                                                            to={
                                                                                "/product/" +
                                                                                val?.slug
                                                                            }
                                                                        >
                                                                            <img
                                                                                src={
                                                                                    val?.image_url
                                                                                }
                                                                                style={{
                                                                                    maxHeight:
                                                                                        "100px",
                                                                                    maxWidth:
                                                                                        "100px",
                                                                                }}
                                                                            />
                                                                        </Link>
                                                                    </div>
                                                                    <div>
                                                                        {" "}
                                                                        <Link
                                                                            to={
                                                                                "/product/" +
                                                                                val?.slug
                                                                            }
                                                                        >
                                                                            <h5 className="uk-text-bold uk-margin-remove">
                                                                                {
                                                                                    val?.name
                                                                                }
                                                                            </h5>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="uk-grid-collapse uk-child-width-1-1">
                                <div className="uk-flex uk-flex-wrap uk-margin-remove">
                                    <div className="uk-width-1-2">
                                        <div className="uk-padding-small">
                                            <div className="uk-card uk-card-default uk-card-body uk-padding-small">
                                                <h5 className="uk-text-bold uk-margin-remove fourth-color">
                                                    Related Services
                                                </h5>

                                                <div
                                                    className="uk-grid-collapse uk-child-width-1-1 uk-margin-top"
                                                    uk-grid="true"
                                                >
                                                    {data?.services?.map(
                                                        (val) => (
                                                            <div key={val?._id}>
                                                                <div className="uk-flex gap-6 uk-margin-bottom">
                                                                    <div>
                                                                        <Link
                                                                            to={
                                                                                "/services/" +
                                                                                val?.slug
                                                                            }
                                                                        >
                                                                            <img
                                                                                src={
                                                                                    val?.image_url
                                                                                }
                                                                                style={{
                                                                                    maxHeight:
                                                                                        "100px",
                                                                                    maxWidth:
                                                                                        "100px",
                                                                                }}
                                                                            />
                                                                        </Link>
                                                                    </div>
                                                                    <div>
                                                                        {" "}
                                                                        <Link
                                                                            to={
                                                                                "/services/" +
                                                                                val?.slug
                                                                            }
                                                                        >
                                                                            <h5 className="uk-text-bold uk-margin-remove">
                                                                                {
                                                                                    val?.name
                                                                                }
                                                                            </h5>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="uk-width-1-2">
                                        <div className="uk-padding-small">
                                            <div className="uk-card uk-card-default uk-card-body uk-padding-small">
                                                <h5 className="uk-text-bold uk-margin-remove fourth-color">
                                                    Medatory Tutorials
                                                </h5>

                                                <div
                                                    className="uk-grid-collapse uk-child-width-1-1 uk-margin-top"
                                                    uk-grid="true"
                                                >
                                                    {data?.tutorials?.map(
                                                        (val) => (
                                                            <div key={val?._id}>
                                                                <div className="uk-flex gap-6 uk-margin-bottom">
                                                                    <div>
                                                                        <Link
                                                                            to={
                                                                                "/tutorial/" +
                                                                                val?.slug
                                                                            }
                                                                        >
                                                                            <img
                                                                                src={
                                                                                    val?.thumbnail_url
                                                                                }
                                                                                style={{
                                                                                    maxHeight:
                                                                                        "100px",
                                                                                    maxWidth:
                                                                                        "100px",
                                                                                }}
                                                                            />
                                                                        </Link>
                                                                    </div>
                                                                    <div>
                                                                        {" "}
                                                                        <Link
                                                                            to={
                                                                                "/tutorial/" +
                                                                                val?.slug
                                                                            }
                                                                        >
                                                                            <h5 className="uk-text-bold uk-margin-remove">
                                                                                {
                                                                                    val?.name
                                                                                }
                                                                            </h5>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
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
