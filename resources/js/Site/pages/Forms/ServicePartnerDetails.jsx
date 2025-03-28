import React, { useEffect, useState } from "react";
import apiClient, { gstToken } from "../../services/api";
import UIkit from "uikit";
import { useNavigate } from "react-router-dom";
import Academic from "../../Components/ServicePartnerRegistration/Academic";
import Skills from "../../Components/ServicePartnerRegistration/Skills";
import Profile from "../../Components/ServicePartnerRegistration/Profile";
import axios from "axios";
import AadharVerification from "../../Components/ServicePartnerRegistration/AadharVerification";

export default function ServicePartnerDetails() {
    // const navigate = useNavigate();
    const [user, setUser] = useState();
    const today = new Date().toISOString().split("T")[0];

    const [formData, setFormData] = useState({
        aadhar_number: "",
        office_address: "",
        office_district: "",
        office_state: "",
        office_pincode: "",
        dob: "",
        id_card: null,
    });

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

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append(
            "user_id",
            `${localStorage.getItem("service_partner_reg")}`
        );
        data.append("office_address", formData.office_address);
        data.append("office_district", formData.office_district);
        data.append("office_state", formData.office_state);
        data.append("office_pincode", formData.office_pincode);
        data.append("dob", formData.dob);
        data.append("id_card", formData.id_card);
        data.append("su_type", "verification");

        // API Call (Optional)
        apiClient
            .post(`/service-partner-details-save`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
                UIkit.notification({
                    message: response?.data?.message,
                    status: "success",
                    timeout: 2000,
                    pos: "top-center",
                });
                getData();
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

    const getData = () => {
        apiClient
            .get(
                `/get-service-partner/` +
                    localStorage.getItem("service_partner_reg"),
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

    const [showSkills, setSkills] = useState("none");
    const [showProfile, setProfile] = useState("none");

    useEffect(() => {
        getData();
    }, []);

    const handleUpdateSk = (value) => {
        setSkills(value.val1);
        setProfile(value.val2);
    };

    const handleChildSubmit = (data) => {
        getData();
    };
    return (
        <div className="uk-flex uk-flex-center uk-padding-large">
            <div style={{ width: "600px" }}>
                {user?.steps == "step1" ? (
                    <div>
                        <h2>Service Partner Registration</h2>
                        <form
                            className="uk-form-stacked"
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <div className="uk-form-controls">
                                    <h4 className="uk-margin-small-bottom">
                                        <b>Verification Details:</b>{" "}
                                    </h4>
                                    {user?.country == "India" ? (
                                        <>
                                            {user?.reg_type === "Individual" ? (
                                                <AadharVerification
                                                    user={user}
                                                    onSubmit={handleChildSubmit}
                                                />
                                            ) : (
                                                ""
                                            )}
                                        </>
                                    ) : (
                                        ""
                                    )}

                                    {user?.country !== "India" ? (
                                        <>
                                            <div className="uk-margin">
                                                <label>
                                                    Upload ID Card{" "}
                                                    <span className="uk-text-danger">
                                                        *
                                                    </span>
                                                    <input
                                                        type="file"
                                                        className="uk-input"
                                                        placeholder="Upload ID Card"
                                                        name="id_card"
                                                        onChange={
                                                            handleFileChange
                                                        }
                                                    />
                                                </label>
                                            </div>
                                        </>
                                    ) : (
                                        ""
                                    )}
                                    {user?.aadhar_verified ? (
                                        <>
                                            <div className="uk-margin">
                                                <label>
                                                    Date Of Birth{" "}
                                                    <span className="uk-text-danger">
                                                        *
                                                    </span>
                                                    <input
                                                        type="date"
                                                        className="uk-input"
                                                        placeholder="Date Of Birth"
                                                        name="dob"
                                                        onChange={handleChange}
                                                        value={formData.dob}
                                                        max={today}
                                                    />
                                                </label>
                                            </div>

                                            <div className="uk-margin">
                                                <button className="uk-button uk-button-primary">
                                                    Next
                                                </button>
                                            </div>
                                        </>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                ) : (
                    ""
                )}
                {user?.steps == "step2" ? (
                    <Academic user={user} onSubmit={handleChildSubmit} />
                ) : (
                    ""
                )}

                {user?.steps == "step3" ? (
                    <Skills onSubmit={handleChildSubmit} />
                ) : (
                    ""
                )}
                {user?.steps == "step4" ? (
                    <Profile onSubmit={handleChildSubmit} />
                ) : (
                    ""
                )}
                {user?.steps == "step5" ? (
                    <>
                        <h2>Thank you, We will contact you soon.</h2>
                    </>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}
