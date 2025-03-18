import React, { useEffect, useState } from "react";
import apiClient from "../../services/api";
import axios from "axios";
import UIkit from "uikit";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function ViewSubmittedPost() {
    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();
    const item = location.state;

    const [data, setData] = useState();

    const getEntityList = async () => {
        const revData = { entity_type: item, entity_id: id };
        try {
            const response = await apiClient.post("/entity-revisions", revData);
            setData(response.data);
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
    }, []);

    if (!data?.data > 0) {
        return "Loading...";
    }

    return (
        <>
            <div id="sc-page-wrapper">
                <div id="sc-page-content">
                    <div className="uk-flex uk-flex-right"></div>

                    <div className="uk-card uk-margin">
                        <h3 className="uk-card-title">
                            Post Revision for:{" "}
                            {data?.data[0]?.entity_data?.name}
                        </h3>

                        <div className="uk-card-body">
                            <div className="uk-overflow-auto">
                                <h2>Post Details</h2>
                                <div class="uk-padding-small" style={{border:"1px solid #ccc"}}>
                                    This card has a default border
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
