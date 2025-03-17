import React from 'react'

export default function NewSubmittedPosts() {
  return (
    <>

<div id="sc-page-wrapper">
                <div id="sc-page-content">
                    <div className="uk-flex uk-flex-right">

                    </div>

                    <div className="uk-card uk-margin">
                        <h3 className="uk-card-title">New Submitted Posts</h3>
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
                                            <th>Thumbnail</th>
                                            <th>Tutorial Discription</th>
                                            <th>Tutorial Name</th>
                                            <th>Tutorial Content</th>
                                            <th>Edit Tutorial</th>
                                        </tr>
                                    </thead>
                                    <tbody>

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
