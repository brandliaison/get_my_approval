import React from "react";

export default function ServicePartnerForm() {
    return (
        <div className="uk-flex uk-flex-center uk-padding-large">
            <div style={{ width: "600px" }}>
                <h2>Service Partner Registration</h2>
                <form class="uk-form-stacked">
                    <div>
                        <label class="uk-form-label">Select Country</label>
                        <div class="uk-form-controls">
                            <div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
                                <label>
                                    <input
                                        class="uk-radio"
                                        type="radio"
                                        name="radio2"
                                        checked
                                    />{" "}
                                    A
                                </label>
                                <label>
                                    <input
                                        class="uk-radio"
                                        type="radio"
                                        name="radio2"
                                    />{" "}
                                    B
                                </label>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
