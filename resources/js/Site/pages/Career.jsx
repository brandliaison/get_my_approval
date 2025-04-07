import React, { useEffect, useState } from "react";
import apiClient from "../services/api";

export default function Career() {
    const [data, setData] = useState();

    const getData = () => {
        apiClient
            .get("/active-jobs")
            .then((response) => {
                setData(response.data.data);
            })
            .catch((error) => {
                console.error("Error fetching data", error);
            });
    };

    useEffect(() => {
        getData();
    }, []);
    console.log(data);

    return (
        <div className="uk-padding-large">
            <h2>Career</h2>

            <div className="uk-margin-top">
                <h4>Current Job Openings</h4>
                <ul uk-accordion="true">
                    {data?.map((val, i) => (
                        <li>
                            <a className="uk-accordion-title" href>
                                {val.title}
                            </a>
                            <div className="uk-accordion-content">
                                Positions: {val.positions}
                                <br />
                                Job Description: {val.description}
                                <div className="uk-margin-top">
                                    <button
                                        className="uk-button uk-button-primary"
                                        uk-toggle="target: #my-id"
                                        type="button"
                                    >
                                        Apply Now
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div id="my-id" uk-modal="true">
                <div className="uk-modal-dialog uk-modal-body">
                    <h4 className="uk-modal-title">Apply For Job</h4>
                    <form>
                        <div className="uk-margin">
                            <label
                                className="uk-form-label"
                                for="form-stacked-text"
                            >
                                Job Title
                            </label>
                            <div className="uk-form-controls">
                                <input
                                    className="uk-input"
                                    id="form-stacked-text"
                                    type="text"
                                />
                            </div>
                        </div>
                        <div className="uk-margin">
                            <label
                                className="uk-form-label"
                                for="form-stacked-text"
                            >
                                Name
                            </label>
                            <div className="uk-form-controls">
                                <input
                                    className="uk-input"
                                    id="form-stacked-text"
                                    type="text"
                                />
                            </div>
                        </div>

                        <div className="uk-margin">
                            <label
                                className="uk-form-label"
                                for="form-stacked-text"
                            >
                                Email
                            </label>
                            <div className="uk-form-controls">
                                <input
                                    className="uk-input"
                                    id="form-stacked-text"
                                    type="text"
                                />
                            </div>
                        </div>

                        <div className="uk-margin">
                            <label
                                className="uk-form-label"
                                for="form-stacked-text"
                            >
                                Mobile
                            </label>
                            <div className="uk-form-controls">
                                <input
                                    className="uk-input"
                                    id="form-stacked-text"
                                    type="text"
                                />
                            </div>
                        </div>

                        <div className="uk-margin">
                            <label
                                className="uk-form-label"
                                for="form-stacked-text"
                            >
                                City
                            </label>
                            <div className="uk-form-controls">
                                <input
                                    className="uk-input"
                                    id="form-stacked-text"
                                    type="text"
                                />
                            </div>
                        </div>

                        <div className="uk-margin">
                            <label
                                className="uk-form-label"
                                for="form-stacked-text"
                            >
                                Upload CV
                            </label>
                            <div className="uk-form-controls">
                                <input
                                    className="uk-input"
                                    id="form-stacked-text"
                                    type="file"
                                />
                            </div>
                        </div>

                        <div className="uk-margin">
                            <button class="uk-button uk-button-primary">
                                Apply Now
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
