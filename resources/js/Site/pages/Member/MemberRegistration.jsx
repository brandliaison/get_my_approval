import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UIkit from "uikit";
import apiClient from "../../frontservices/api";

export default function MemberRegistration() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // API Call (Optional)
        apiClient
            .post(`/user/register`, formData)
            .then((response) => {
                console.log("Success:", response.data);
                UIkit.notification({
                    message: response?.data?.message,
                    status: "success",
                    timeout: 2000,
                    pos: "top-center",
                });
                setFormData({
                    name: "",
                    email: "",
                    mobile: "",
                    password: "",
                });
                navigate("/member-otp");
                localStorage.setItem(
                    "member_reg",
                    response.data.user
                );
            })
            .catch((error) => {
                // console.error("Error:", error?.response);
                if (error?.response?.data?.errors) {
                    Object.entries(error.response.data.errors).forEach(
                        ([key, messages]) => {
                            messages.forEach((msg) => {
                                UIkit.notification({
                                    message: msg, // Display actual error message
                                    status: "danger",
                                    timeout: 2000,
                                    pos: "top-center",
                                });
                            });
                        }
                    );
                } else {
                    UIkit.notification({
                        message: error?.response?.data?.message,
                        status: "danger",
                        timeout: 2000,
                        pos: "top-center",
                    });
                }
            });
    };

    return (
        <div className="uk-flex uk-flex-center uk-padding-large">
            <div style={{ width: "600px" }}>
                <h2>Member Registration</h2>
                <form className="uk-form-stacked" onSubmit={handleSubmit}>
                    <div className="uk-margin">
                        <label>
                            Name
                            <span className="uk-text-danger">*</span>
                            <input
                                type="text"
                                className="uk-input"
                                placeholder="Enter Full Name"
                                name="name"
                                onChange={handleChange}
                                value={formData.name}
                            />
                        </label>
                    </div>

                    <div className="uk-margin">
                        <label>
                            Email
                            <span className="uk-text-danger">*</span>
                            <input
                                type="text"
                                className="uk-input"
                                placeholder="Enter Email"
                                name="email"
                                onChange={handleChange}
                                value={formData.email}
                            />
                        </label>
                    </div>

                    <div className="uk-margin">
                        <div className="uk-flex">
                            <div className="uk-width-1-3">
                                <label>
                                    Country
                                    <span className="uk-text-danger">*</span>
                                    <input
                                        type="text"
                                        className="uk-input"
                                        placeholder="Enter Full Phone"
                                        value="+91"
                                        disabled
                                    />
                                </label>
                            </div>
                            <div className="uk-width-1-1">
                                <label>
                                    Phone
                                    <span className="uk-text-danger">*</span>
                                    <input
                                        type="text"
                                        className="uk-input"
                                        placeholder="Enter Phone Number"
                                        name="phone"
                                        onChange={handleChange}
                                        value={formData.phone}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="uk-margin">
                        <label>
                            Password
                            <span className="uk-text-danger">*</span>
                            <input
                                type="password"
                                className="uk-input"
                                placeholder="Enter Password"
                                name="password"
                                onChange={handleChange}
                                value={formData.password}
                            />
                        </label>
                    </div>
                    <div className="uk-margin">
                        <button className="uk-button uk-button-primary">
                            Register Now
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
