import React from "react";
import SearchableDropdown from "./SearchableDropdown";
import apiClient from "../services/api";
import UIkit from "uikit";
import FormatText from "./FormatText";

export default function RelationalData({
    dataType,
    redata,
    id,
    activeData,
    fromType,
    refreshParent,
}) {
    const handleNotificationSelect = (selectedOption, type) => {
        const data = {
            service_id: id,
            id: [selectedOption._id],
            type: type,
            fromType: fromType,
        };

        apiClient
            .post(`/services/${id}/attach-relations`, data)
            .then((response) => {
                UIkit.notification({
                    message: "Data successfully!",
                    status: "success",
                    timeout: 2000,
                    pos: "top-center",
                });
                if (refreshParent) {
                    refreshParent();
                }
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

    const handleDetachSelect = (tid) => {
        const data = {
            service_id: id,
            id: [tid.tid],
            type: tid.type,
            fromType: fromType,
        };

        apiClient
            .post(`/services/${id}/detach-relations`, data)
            .then((response) => {
                console.log("Success:", response);
                UIkit.notification({
                    message: "Data successfully!",
                    status: "success",
                    timeout: 2000,
                    pos: "top-center",
                });
                if (refreshParent) {
                    refreshParent();
                }
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

    return (
        <div>
            <div className="uk-card uk-card-default uk-card-body">
                <h5>Assign <FormatText text={dataType} /> </h5>
                <div className="uk-margin-small-top">
                    <SearchableDropdown
                        options={activeData}
                        onSelect={(e) => handleNotificationSelect(e, dataType)}
                    />

                    <div className="uk-margin-top">
                        {redata?.length > 0
                            ? redata?.map((val) => (
                                  <div className="uk-flex uk-flex-between uk-margin-small-top" key={val._id}>
                                      <div>{val.name}</div>
                                      <div>
                                          <button
                                              className="uk-button uk-button-danger uk-button-small"
                                              onClick={() =>
                                                  handleDetachSelect({
                                                      tid: val._id,
                                                      type: dataType,
                                                  })
                                              }
                                          >
                                              X
                                          </button>
                                      </div>
                                  </div>
                              ))
                            : "Data Not Found!"}
                    </div>
                </div>
            </div>
        </div>
    );
}
