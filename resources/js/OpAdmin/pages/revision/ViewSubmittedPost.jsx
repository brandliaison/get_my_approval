import React, { useEffect, useState } from "react";
import apiClient from "../../services/api";
import axios from "axios";
import UIkit from "uikit";
import { useNavigate } from "react-router-dom";

export default function ViewSubmittedPost() {
    const navigate = useNavigate();

    const [data, setData] = useState();
    const [entityList, setEntityList] = useState();
    const [entityData, setEntityData] = useState("Blog");

    const getEntityList = async () => {
        try {
            const response = await apiClient.get("/entity-list");
            setEntityList(response.data);
        } catch (error) {
            console.log(err);

            UIkit.notification({
                message: "Failed to load data!",
                status: "danger",
                timeout: 1000,
                pos: "top-center",
            });
        }
    };

    useEffect(() => {
        getEntityList();
        handelEntityChange();
    }, []);

    const handelEntityChange = async (val) => {
        var valData = val ? val : "Blog";
        const entity_type = { entity_type: valData };

        try {
            const response = await apiClient.post(
                "/entity-data-list",
                entity_type
            );
            setEntityData(response.data);
        } catch (error) {
            console.log(err);

            UIkit.notification({
                message: "Failed to load data!",
                status: "danger",
                timeout: 1000,
                pos: "top-center",
            });
        }
    };

    if (entityList == null) {
        return "Loading...";
    }

    const entityArray = Object.entries(entityList?.data);

    const handleView = (id) => {
        navigate(`/op-admin/submitted-post-view/${id}`); // Redirect to second page with blog ID in URL
    };

    console.log(entityData);


    return (
        <>
            <div id="sc-page-wrapper">
                <div id="sc-page-content">
                    <div className="uk-flex uk-flex-right"></div>

                    <div className="uk-card uk-margin">
                        <div className="uk-flex uk-flex-between uk-padding-small">
                            <h3 className="uk-card-title">
                                New Submitted Posts
                            </h3>

                        </div>

                        <div className="uk-card-body">
                            <div className="uk-overflow-auto">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
