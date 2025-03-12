import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function EditBlogCategory() {

    const { id } = useParams();
    const [formData, setformData] = useState({
        name: '',
        description: '',
        title: '',
        slug: '',
    });

    useEffect(() => {
        editblogcategory()
    }, [])

    const editblogcategory = () => {
        axios.get(`${apiurl}/blogs/${id}`)
        .then((res) => {
            setformData(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

  return (
    <>
        <div id="sc-page-wrapper">
            <div id="sc-page-content">
                <div className="uk-child-width-1-1@l" data-uk-grid>
                    <div>
                        <div className="uk-card">
                            <div className="uk-card-body">
                                <h5 className="uk-heading-line"><span>Add Blog Category</span></h5>
                                <form onSubmit={handleSubmit}>
                                    <fieldset className="uk-fieldset">
                                    <div className="uk-grid uk-grid-small uk-child-width-1-2@l" uk-grid="true">
                                            <div>
                                                <input className="uk-input uk-margin-bottom" type="text" name="name" onChange={handleChange} value={formData.name} placeholder="Blog Category Name" data-sc-input />
                                            </div>
                                            <div>
                                                <input className="uk-input uk-margin-bottom" type="text" name='title' onChange={handleChange} value={formData.title} placeholder="Blog Category Title" data-sc-input />
                                            </div>
                                        </div>
                                        <div className="uk-margin">
                                                <input className="uk-input uk-margin-bottom" type="text" name='slug' onChange={handleChange} value={formData.slug} placeholder="Blog Category Slug" data-sc-input />
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
