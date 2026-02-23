import React, { useEffect, useState } from "react";
import UIkit from "uikit";
import { useNavigate } from "react-router-dom";
import apiClient from "../../frontservices/api";

export default function MemberOtp() {
    const navigate = useNavigate();
    const [emailOtp, setEmailOtp] = useState();
    const [emailDisabled, setEmailDisabled] = useState(false);
    const [mobileOtp, setMobileOtp] = useState();
    const [mobileDisabled, setMobileDisabled] = useState(false);
    const [user, setUser] = useState();
    const [email, setEmail] = useState();
    const [mobile, setMobile] = useState();

    const userData = localStorage.getItem("member_reg");

    const getData = () => {
        apiClient
            .get(
                `/user/get-member/` +
                    localStorage.getItem("member_reg"),
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((res) => {
                setUser(res.data.user);
                setFormData({
                    dob: user?.dob,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        getData();
    }, []);

    const resendOtp = (e) => {
        // API Call (Optional)
        apiClient
            .post(`/user/resend-otp`, {
                id: userData,
                type: e,
            })
            .then((response) => {
                UIkit.notification({
                    message: response?.data?.message,
                    status: "success",
                    timeout: 2000,
                    pos: "top-center",
                });
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

    const verifyOtp = (e) => {
        // API Call (Optional)
        if (e === "email") {
            var otp = emailOtp;
        }
        if (e === "phone") {
            var otp = mobileOtp;
        }
        apiClient
            .post(`/user/verify-member-otp`, {
                id: userData,
                type: e,
                otp: otp,
            })
            .then((response) => {
                UIkit.notification({
                    message: response?.data?.message,
                    status: response?.data?.status,
                    timeout: 2000,
                    pos: "top-center",
                });
                if (response?.data?.status == "success") {
                    if (e === "email") {
                        setEmailDisabled(true);
                    }
                    if (e === "phone") {
                        setMobileDisabled(true);
                    }
                    if (response?.data?.url == true) {
                        navigate("/service-partner-details");
                    }
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                UIkit.notification({
                    message: error?.response?.data?.message,
                    status: response?.data?.status,
                    timeout: 2000,
                    pos: "top-center",
                });
            });
    };

    const changeEmailMobile = (e) => {
        const formData = {
            su_type: "emailMobileChange",
            user_id: `${localStorage.getItem("member_reg")}`,
            email: email,
            phone: mobile,
        };
        apiClient
            .post(`/user/member-details-save`, formData)
            .then((response) => {
                UIkit.notification({
                    message: response?.data?.message,
                    status: "success",
                    timeout: 2000,
                    pos: "top-center",
                });

                UIkit.modal("#email_change").hide();
                UIkit.modal("#mobile_change").hide();
                getData();
            })
            .catch((error) => {
                const errors = error?.response?.data?.errors;

                if (errors) {
                    Object.keys(errors).forEach((field) => {
                        errors[field].forEach((message) => {
                            UIkit.notification({
                                message,
                                status: "danger",
                                timeout: 2000,
                                pos: "top-center",
                            });
                        });
                    });
                } else {
                    UIkit.notification({
                        message: "An unknown error occurred.",
                        status: "danger",
                        timeout: 2000,
                        pos: "top-center",
                    });
                }
            });
    };

    return (
        <div className="uk-flex uk-flex-center uk-padding-large" id="pageId">
            <div style={{ width: "600px" }}>
                <h2>Verify OTP</h2>
                <div className="uk-margin">
                    <label>
                        Email OTP <span className="uk-text-danger">*</span>
                    </label>
                    <br />
                    <div class="uk-alert-success uk-flex uk-flex-between uk-padding-small">
                        <span>An OTP Has Been Set at: {user?.email}</span>
                        <button uk-toggle="target: #email_change" type="button">
                            <b>Change Email</b>
                        </button>
                    </div>

                    <div uk-form-custom="target: true">
                        <input
                            className="uk-input uk-form-width-medium"
                            type="text"
                            placeholder="Enter Email OTP"
                            name="email_otp"
                            onChange={(e) => setEmailOtp(e.target.value)}
                            value={emailOtp}
                            disabled={emailDisabled}
                        />
                    </div>
                    <button
                        className="uk-button uk-button-default"
                        onClick={() => verifyOtp("email")}
                    >
                        Submit
                    </button>
                    <div>
                        <button
                            className="uk-text-small"
                            onClick={() => resendOtp("email")}
                        >
                            Resend OTP
                        </button>
                    </div>
                </div>
                <div className="uk-margin">
                    <label>
                        Mobile OTP <span className="uk-text-danger">*</span>
                    </label>
                    <br />
                    <div class="uk-alert-success uk-flex uk-flex-between uk-padding-small">
                        <span>An OTP Has Been Set at: {user?.phone}</span>
                        <button
                            uk-toggle="target: #mobile_change"
                            type="button"
                        >
                            <b>Change Mobile</b>
                        </button>
                    </div>
                    <div uk-form-custom="target: true">
                        <input
                            className="uk-input uk-form-width-medium"
                            type="text"
                            placeholder="Enter Mobile OTP"
                            name="phone_otp"
                            onChange={(e) => setMobileOtp(e.target.value)}
                            value={mobileOtp}
                            disabled={mobileDisabled}
                        />
                    </div>
                    <button
                        className="uk-button uk-button-default"
                        onClick={() => verifyOtp("phone")}
                    >
                        Submit
                    </button>
                    <div>
                        <button
                            className="uk-text-small"
                            onClick={() => resendOtp("phone")}
                        >
                            Resend OTP
                        </button>
                    </div>
                </div>
            </div>

            <div id="email_change" uk-modal="true" container="#pageId">
                <div class="uk-modal-dialog uk-modal-body">
                    <h2 class="uk-modal-title">Change Email</h2>
                    <input
                        type="text"
                        className="uk-input"
                        value={email ?? user?.email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                        class="uk-button uk-button-primary uk-margin-small-top"
                        type="button"
                        onClick={changeEmailMobile}
                    >
                        Change Email
                    </button>
                </div>
            </div>

            <div id="mobile_change" uk-modal="true" container="#pageId">
                <div class="uk-modal-dialog uk-modal-body">
                    <h2 class="uk-modal-title">Change Mobile Number</h2>
                    <input
                        type="text"
                        className="uk-input"
                        value={mobile ?? user?.phone}
                        onChange={(e) => setMobile(e.target.value)}
                    />
                    <button
                        class="uk-button uk-button-primary uk-margin-small-top"
                        type="button"
                        onClick={changeEmailMobile}
                    >
                        Change Mobile
                    </button>
                </div>
            </div>
        </div>
    );
}
