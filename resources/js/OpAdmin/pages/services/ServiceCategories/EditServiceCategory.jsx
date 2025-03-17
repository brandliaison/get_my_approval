import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../../../services/api';
import UIkit from 'uikit';

export default function EditServiceCategory() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setformData] = useState({
        name: '',
        description: '',
        title: '',
        slug: '',
    });

        // Handle text input changes
    const handleChange = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        editblogcategory()
    }, [])

    const editblogcategory = () => {
        axios.get(`${apiClient}/service-categories/${id}`)
        .then((res) => {
            setformData(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create FormData object
        const data = new FormData();
        data.append("name", formData.name);
        data.append("description", formData.description);
        data.append("title", formData.title);
        data.append("slug", formData.slug);
        data.append("_method", 'PUT');

        // Log to console (for debugging)
        console.log("Form Data:", Object.fromEntries(data));

        // API Call
        axios.post(`${apiClient}/service-categories/${id}`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then(response => {
            console.log("Success:", response.data);

            // Show success notification
            UIkit.notification({
                message: "Category updated successfully!",
                status: "success",
                timeout: 2000,
                pos: "top-center",
            });

            // navigate to categories
            navigate('/op-admin/service-categories')
        })
        .catch(error => {
            console.error("Error:", error);

            // Show error notification
            UIkit.notification({
                message: error?.response?.data?.message || "An error occurred",
                status: "danger",
                timeout: 2000,
                pos: "top-center",
            });
        });
    };

  return (
    <>
        <div id="sc-page-wrapper">
            <div id="sc-page-content">
                <div className="uk-child-width-1-1@l" data-uk-grid>
                    <div>
                        <div className="uk-card">
                            <div className="uk-card-body">
                                <h5 className="uk-heading-line"><span>Add Service Category</span></h5>

                                <form onSubmit={handleSubmit}>
                                    <fieldset className="uk-fieldset">
                                    <div className="uk-grid uk-grid-small uk-child-width-1-2@l" uk-grid="true">
                                            <div>
                                                <input className="uk-input uk-margin-bottom" type="text" name="name" onChange={handleChange} value={formData.name} placeholder="Category Name" data-sc-input />
                                            </div>
                                            <div>
                                                <input className="uk-input uk-margin-bottom" type="text" name='title' onChange={handleChange} value={formData.title} placeholder="Category Title" data-sc-input />
                                            </div>
                                        </div>
                                        <div className="uk-margin">
                                                <input className="uk-input uk-margin-bottom" type="text" name='slug' onChange={handleChange} value={formData.slug} placeholder="Category Slug" data-sc-input />
                                                <textarea className="uk-textarea" rows="5" name='description' onChange={handleChange} value={formData.description} placeholder="Discription" data-sc-input></textarea>
                                        </div>
                                        <div className="uk-margin">
                                            <input type='submit' className='sc-button waves-effect waves-button solid-button' value='Submit'></input>
                                        </div>
                                    </fieldset>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
