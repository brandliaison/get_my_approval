import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Blogs() {

    const [blogs, setblogs] = useState('')

    useEffect(() => {
        const getblogs = () => {
            axios.get('http://localhost:8000/api/v1/op-admin/blog-categories/')
            .then((res) => {
                console.log(res.data)
                setblogs(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        }
        getblogs();
    }, [])

    console.log(blogs)

    return (
        <>
            <div id="sc-page-wrapper">
                <div id="sc-page-content">
                    <div className="uk-flex uk-flex-right">
                        <button
                            class="sc-fab sc-fab-text sc-fab-success solid-button"
                            uk-toggle="target: #modal-overflow"
                        >
                            <i class="mdi mdi-plus"></i>Create
                        </button>
                    </div>

                    <div class="uk-card uk-margin">
                        <h3 class="uk-card-title">Blogs</h3>
                        <div class="uk-card-body">
                            <div class="uk-overflow-auto">
                                <table class="uk-table uk-table-hover uk-table-middle uk-table-divider">
                                    <thead>
                                        <tr>
                                            <th>
                                                <input
                                                    class="uk-checkbox sc-main-checkbox"
                                                    type="checkbox"
                                                    data-sc-icheck
                                                    data-group=".sc-js-table-checkbox"
                                                />
                                            </th>
                                            <th>Blog Image</th>
                                            <th>Blog Discription</th>
                                            <th>Blog Name</th>
                                            <th>Blog Title</th>
                                            <th>Edit Blog</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <input
                                                    class="uk-checkbox sc-js-table-checkbox"
                                                    type="checkbox"
                                                    data-sc-icheck
                                                />
                                            </td>
                                            <td>
                                                <img
                                                    src="https://scutum-universal.tzdthemes.com/_nuxt/img/avatar_03_md.1ecd497.png"
                                                    class="sc-avatar uk-preserve-width"
                                                    alt="pagac.twila"
                                                />
                                            </td>
                                            <td>
                                                <a
                                                    class="uk-link-reset"
                                                    href="#"
                                                >
                                                    Lorem ipsum dolor sit amet,
                                                    consectetur adipiscing elit,
                                                    sed do eiusmod tempor.
                                                </a>
                                            </td>
                                            <td>Lorem ipsum</td>
                                            <td>Lorem ipsum</td>
                                            <td>
                                                <div>
                                                    <a
                                                        class="sc-button sc-button-secondary sc-js-button-wave-light"
                                                        href="#"
                                                    >
                                                        <i class="mdi mdi-trash-can-outline"></i>{" "}
                                                        Delete
                                                    </a>
                                                </div>
                                                <div className="uk-margin-top">
                                                    <a
                                                        class="sc-button sc-button-primary sc-js-button-wave-light"
                                                        href="#"
                                                    >
                                                        <i class="mdi mdi-file-edit">
                                                            {" "}
                                                        </i>
                                                        Edit
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* form on modal  */}
            <div id="modal-overflow" data-uk-modal>
                <div class="uk-modal-dialog">
                    <button
                        class="uk-modal-close-default"
                        type="button"
                        data-uk-close
                    ></button>
                    <div class="uk-modal-header">
                        <h2 class="uk-modal-title uk-text-bold">Edit Blog Category</h2>
                    </div>
                    <div class="uk-modal-body" data-uk-overflow-auto>
                        <p class="uk-modal-title uk-text-medium">Edit the details of the blog category.</p>
                        <form class="uk-form-stacked">
                            {/* <!-- Name --> */}
                            <div class="uk-margin-small-bottom">
                                <label class="uk-form-label" for="name">Name*</label>
                                <input class="uk-input" id="name" type="text" placeholder="Enter your name" required />
                            </div>

                            {/* <!-- Title --> */}
                            <div class="uk-margin-small-bottom">
                                <label class="uk-form-label" for="title">Title*</label>
                                <input class="uk-input" id="title" type="text" placeholder="Enter title" required />
                            </div>

                            {/* <!-- Slug --> */}
                            <div class="uk-margin-small-bottom">
                                <label class="uk-form-label" for="slug">Slug*</label>
                                <input class="uk-input" id="slug" type="text" placeholder="Enter slug" required />
                            </div>

                            {/* <!-- File Upload --> */}
                            <div class="uk-margin-small-bottom">
                                <label class="uk-form-label" for="file">Upload File</label>
                                <div class="uk-form-controls">
                                    <input class="uk-input" id="file" type="file" />
                                </div>
                            </div>

                            {/* <!-- Description (Textarea) --> */}
                            <div class="uk-margin-small-bottom">
                                <label class="uk-form-label" for="description">Description*</label>
                                <textarea class="uk-textarea" id="description" placeholder="Enter description" rows="4"></textarea>
                            </div>
                        </form>

                    </div>
                    <hr class="uk-margin-remove" />
                    <div class="uk-modal-footer">
                        <button class="sc-button sc-button-success" type="button">
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
