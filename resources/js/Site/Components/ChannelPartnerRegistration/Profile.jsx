import React, { useEffect, useState } from "react";
import UIkit from "uikit";
import partnerApi from "../../services/partnerApi";

const Profile = ({ user, onSubmit }) => {
    const [formData, setFormData] = useState({
        business_title: "",
        business_description: "",
        profile_photo: null,
        photo: null,
        agreed_terms: false,
    });

    const handleSubmitSk = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append(
            "user_id",
            `${localStorage.getItem("channel_partner_reg")}`
        );
        data.append("business_title", formData.business_title);
        data.append("business_description", formData.business_description);
        data.append("profile_photo", formData.profile_photo);
        data.append("photo", formData.photo);
        data.append("website", formData.website);
        data.append("agreed_terms", formData.agreed_terms);
        data.append("su_type", "profile");

        // API Call (Optional)
        partnerApi
            .post(`/channel-partner-details-save`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
                UIkit.notification({
                    message: response?.data?.message,
                    status: "success",
                    timeout: 2000,
                    pos: "top-center",
                });
                onSubmit();
            })
            .catch((error) => {
                console.error("Error:", error);
                UIkit.notification({
                    message: error?.response?.data?.message,
                    status: "danger",
                    timeout: 2000,
                    pos: "top-center",
                });
            });
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle file input change
    const handleFileChange = (e) => {
        console.log(e.target.files[0]);
        setFormData({
            ...formData,
            [e.target.name]: e.target.files[0], // Store the first selected file
        });
    };

    return (
        <div>
            <h2>Current Business</h2>
            <form className="uk-form-stacked" onSubmit={handleSubmitSk}>
                <div className="uk-form-controls">
                    <>
                        <div className="uk-width-1-1">
                            <label htmlFor="">Business Title</label>
                            <input
                                type="text"
                                className="uk-input"
                                placeholder="Enter Business Name"
                                name="business_title"
                                value={formData.business_title}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="uk-width-1-1 uk-margin-small-top">
                            <label htmlFor="">Business Description</label>
                            <input
                                type="text"
                                className="uk-input"
                                placeholder="Enter Business Description"
                                name="business_description"
                                value={formData.business_description}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="uk-flex gap-6 uk-margin-small-top uk-margin-small-bottom">
                            {/* Service Dropdown */}
                            <div className="uk-width-1-2">
                                <label htmlFor="">
                                    Upload Brochure / Profile
                                </label>
                            </div>

                            <div className="uk-width-1-2 uk-flex uk-gap-small">
                                <input
                                    type="file"
                                    className="uk-input"
                                    name="profile_photo"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>

                        <div className="uk-flex gap-6 uk-margin-small-top uk-margin-small-bottom">
                            <div className="uk-width-1-2">
                                <label htmlFor="">Upload Photograph</label>
                            </div>

                            <div className="uk-width-1-2 uk-flex uk-gap-small">
                                <input
                                    type="file"
                                    className="uk-input"
                                    name="photo"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>

                        <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                            <label>
                                <input
                                    class="uk-checkbox"
                                    type="checkbox"
                                    onChange={handleFileChange}
                                />{" "}
                                Agree Terms and Conditions
                            </label>
                        </div>
                    </>

                    <div className="uk-margin">
                        <button className="uk-button uk-button-primary">
                            Send
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Profile;
