import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiClient from "../../services/api";
import UIkit from "uikit";
import RelationalData from "../../components/RelationalData";
import ActiveData from "../../components/ActiveData";

export default function EditNotifications() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [tutorialcategrydata, settutorialcategrydata] = useState([]);
    const [formData, setformData] = useState({
        name: "",
        notification_category_id: "",
        image_url: null,
        image_alt: "",
        description: "",
        content: "",
        compliance_header: "",
    });

    const edittutorial = () => {
        apiClient
            .get(`/notifications/${id}`)
            .then((res) => {
                setformData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        gettutorialcategories();
        edittutorial();
    }, []);

    const gettutorialcategories = () => {
        apiClient
            .get(`/active-notification-categories/`)
            .then((res) => {
                console.log(res.data);
                settutorialcategrydata(res.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // Handle text input changes
    const handleChange = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle file input change
    const handleFileChange = (e) => {
        console.log(e.target.files[0]);
        setformData({
            ...formData,
            image_url: e.target.files[0], // Store the first selected file
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        // Create FormData object
        const data = new FormData();
        data.append("name", formData.name);
        data.append(
            "notification_category_id",
            formData.notification_category_id
        );
        data.append("image_url", formData.image_url);
        data.append("image_alt", formData.image_alt);
        data.append("description", formData.description);
        data.append("compliance_header", formData.compliance_header);
        data.append("_method", "PUT");

        // Log to console (for debugging)
        console.log("Form Data:", Object.fromEntries(data));

        // API Call (Optional)
        apiClient
            .post(`/notifications/${id}`, data, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((response) => {
                console.log("Success:", response.data);
                navigate("/op-admin/notifications");
                UIkit.notification({
                    message: "Product created successfully!",
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

    const products = ActiveData("products");
    const tutorials = ActiveData("tutorials");
    const services = ActiveData("services");
    const blogs = ActiveData("blogs");

    return (
        <>
            <div id="sc-page-wrapper">
                <div id="sc-page-content">
                    <div className="uk-child-width-1-1@l" data-uk-grid>
                        <div>
                            <div className="uk-card">
                                <div className="uk-card-body">
                                    <h5 className="uk-heading-line">
                                        <span>Add Notification</span>
                                    </h5>
                                    <form onSubmit={handleSubmit}>
                                        <fieldset className="uk-fieldset">
                                            <div
                                                className="uk-grid uk-grid-small uk-child-width-1-2@l"
                                                uk-grid="true"
                                            >
                                                <div>
                                                    <input
                                                        className="uk-input uk-margin-bottom"
                                                        type="text"
                                                        name="name"
                                                        onChange={handleChange}
                                                        value={formData.name}
                                                        placeholder="Notification Name"
                                                        data-sc-input
                                                    />
                                                    <input
                                                        className="uk-input uk-margin-bottom"
                                                        type="file"
                                                        name="image_url"
                                                        onChange={
                                                            handleFileChange
                                                        }
                                                        data-sc-input
                                                    />
                                                </div>
                                                <div>
                                                    <select
                                                        className="uk-select uk-margin-bottom"
                                                        name="notification_category_id"
                                                        onChange={handleChange}
                                                        value={
                                                            formData.notification_category_id
                                                        }
                                                        style={{
                                                            borderTop: "none",
                                                            borderLeft: "none",
                                                            borderRight: "none",
                                                            borderRadius: "0px",
                                                        }}
                                                    >
                                                        <option value="">
                                                            Select a category
                                                        </option>
                                                        {Array.isArray(
                                                            tutorialcategrydata
                                                        ) &&
                                                        tutorialcategrydata.length >
                                                            0 ? (
                                                            tutorialcategrydata.map(
                                                                (
                                                                    value,
                                                                    index
                                                                ) => (
                                                                    <option
                                                                        key={
                                                                            index
                                                                        }
                                                                        value={
                                                                            value._id
                                                                        }
                                                                    >
                                                                        {
                                                                            value.name
                                                                        }
                                                                    </option>
                                                                )
                                                            )
                                                        ) : (
                                                            <option disabled>
                                                                No categories
                                                                available
                                                            </option>
                                                        )}
                                                    </select>
                                                    <input
                                                        className="uk-input uk-margin-bottom"
                                                        type="text"
                                                        name="image_alt"
                                                        onChange={handleChange}
                                                        value={
                                                            formData.image_alt
                                                        }
                                                        placeholder="Service Image Alt"
                                                        data-sc-input
                                                    />
                                                </div>
                                            </div>
                                            <div className="uk-margin">
                                                <input
                                                    className="uk-input uk-margin-bottom"
                                                    type="text"
                                                    name="compliance_header"
                                                    onChange={handleChange}
                                                    value={
                                                        formData.compliance_header
                                                    }
                                                    placeholder="Compliance Header"
                                                    data-sc-input
                                                />
                                                <textarea
                                                    className="uk-textarea"
                                                    rows="5"
                                                    name="description"
                                                    onChange={handleChange}
                                                    value={formData.description}
                                                    placeholder="Discription"
                                                    data-sc-input
                                                ></textarea>
                                            </div>
                                            <div className="uk-margin">
                                                <input
                                                    type="submit"
                                                    className="sc-button waves-effect waves-button solid-button"
                                                    value="Submit"
                                                ></input>
                                            </div>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className="uk-child-width-expand@s" uk-grid="true">
                            <RelationalData
                                dataType="products"
                                redata={formData?.products}
                                id={id}
                                activeData={products}
                                fromType="notification"
                                refreshParent={edittutorial}
                            />

                            <RelationalData
                                dataType="services"
                                redata={formData?.services}
                                id={id}
                                activeData={services}
                                fromType="notification"
                                refreshParent={edittutorial}
                            />

                            <RelationalData
                                dataType="tutorials"
                                redata={formData?.tutorials}
                                id={id}
                                activeData={tutorials}
                                fromType="notification"
                                refreshParent={edittutorial}
                            />

                            <RelationalData
                                dataType="blogs"
                                redata={formData?.blogs}
                                id={id}
                                activeData={blogs}
                                fromType="notification"
                                refreshParent={edittutorial}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
