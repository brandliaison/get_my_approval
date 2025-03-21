import React from 'react'

export default function Designation() {
  return (
    <>
    
            <div id="sc-page-wrapper">
                <div id="sc-page-content">
                    <div className="uk-flex uk-flex-between uk-flex-middle">
                        <h3>Notification Categories</h3>
                        <Link to="/op-admin/addnotification-categories">
                            <button className="sc-fab sc-fab-text sc-fab-success solid-button">
                                <i className="mdi mdi-plus"></i>Create
                            </button>
                        </Link>
                    </div>

                    <form
                        className="uk-search uk-search-default uk-width-1-1 uk-background-default uk-border-rounded uk-flex uk-flex-middle uk-margin-top"
                        style={{ padding: "10px 15px" }}
                    >
                        <span
                            style={{
                                color: "gray",
                                fontSize: "24px",
                                padding: "5px",
                            }}
                        >
                            <i className="mdi mdi-magnify"></i>
                        </span>
                        <input
                            className="uk-search-input uk-width-1-1 uk-background-default uk-border-none"
                            type="search"
                            placeholder="Search..."
                            style={{ border: "none" }}
                        />
                    </form>

                    <div className="uk-card uk-margin">
                        <div className="uk-card-body">
                            <div className="uk-overflow-auto">
                                <table className="uk-table uk-table-hover uk-table-middle uk-table-divider">
                                    <thead>
                                        <tr>
                                            <th>
                                                <input
                                                    className="uk-checkbox sc-main-checkbox"
                                                    type="checkbox"
                                                    data-sc-icheck
                                                    data-group=".sc-js-table-checkbox"
                                                />
                                            </th>
                                            <th>Name</th>
                                            <th>Discription</th>
                                            <th>Status</th>
                                            <th>Approval Status</th>
                                            <th>Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories?.data?.length > 0 ? (
                                            categories?.data?.map(
                                                (value, index) => (
                                                    <tr key={index}>
                                                        <td>
                                                            <input
                                                                className="uk-checkbox sc-js-table-checkbox"
                                                                type="checkbox"
                                                                data-sc-icheck
                                                            />
                                                        </td>
                                                        <td>{value.name}</td>
                                                        <td>
                                                            {value.description}
                                                        </td>
                                                        <td className="uk-text-capitalize">
                                                            {value.status}
                                                        </td>
                                                        <td className="uk-text-capitalize">
                                                            {
                                                                value.approval_status
                                                            }
                                                        </td>
                                                        <td className="uk-text-capitalize">
                                                            {
                                                                <FormattedDate
                                                                    getDate={
                                                                        value.created_at
                                                                    }
                                                                />
                                                            }
                                                        </td>
                                                        <td>
                                                            <div className="uk-flex gap-2">
                                                                <div>
                                                                    <Link
                                                                        to={`/op-admin/view-notification-categories/${value._id}`}
                                                                        className="sc-button sc-button-primary sc-js-button-wave-light"
                                                                    >
                                                                        <i className="mdi mdi-eye"></i>
                                                                    </Link>
                                                                </div>
                                                                <div
                                                                    onClick={() =>
                                                                        handleViewService(
                                                                            value._id
                                                                        )
                                                                    }
                                                                >
                                                                    <a
                                                                        className="sc-button sc-button-danger sc-js-button-wave-light"
                                                                        href="#"
                                                                    >
                                                                        <i className="mdi mdi-file-edit"></i>
                                                                    </a>
                                                                </div>

                                                                <div
                                                                    onClick={(
                                                                        e
                                                                    ) =>
                                                                        deleteCategory(
                                                                            value._id
                                                                        )
                                                                    }
                                                                >
                                                                    <a
                                                                        className="sc-button sc-button-secondary sc-js-button-wave-light"
                                                                        href="#"
                                                                    >
                                                                        <i className="mdi mdi-trash-can-outline"></i>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            )
                                        ) : (
                                            <tr>
                                                <td>
                                                    <p>No data available.</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

    </>
  )
}
