import React, { useState } from 'react';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import AdminMenu from '../../components/Layout/AdminMenu';
import '../../styles/AddLec.css'
import axios from 'axios';

const AddLecture = () => {
    const [course, setCourse] = useState({
        name: '',
        description: '',
        price: '',
        image: null,
        //videos: []
    });

    const handleChange = (e) => {
        const { name,value, files } = e.target;

        if (name === 'imageUrl') {
            setCourse({ ...course, imageUrl: files[0] });
        }
        // else if (name === 'videos') {
            //setCourse({ ...course, videos: Array.from(files) });
       // }
        else {
            setCourse({ ...course, [name]: value });
    }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form submitted', course);

        const formData = new FormData();
        formData.append('name', course.name);
        formData.append('description', course.description);
        formData.append('price', course.price);
        formData.append('image', course.imageUrl);
       // course.videos.forEach((video, index) => {
            //formData.append(`videos`, video);
        //} );

        console.log('ook');

        try {
            const response = await axios.post('/api/v1/auth/add-course', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Course added:', response.data);
            // You can display a success notification or redirect here
        } catch (error) {
            console.error('Error adding course:', error.response?.data || error.message);
            // You can display an error notification here
        }
    };

    return (
        <div title={'Dashboard - Add Lecture'}>
            <Header />
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1 className='mb-4'>Add New Lecture</h1>
                        <form className='lecture-form' onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label>Course Name</label>
                                <input
                                    type='text'
                                    name='name'
                                    value={course.name}
                                    onChange={handleChange}
                                    className='form-control'
                                    placeholder='Enter course name'
                                    required
                                />
                            </div>
                            <div className='form-group'>
                                <label>Description</label>
                                <textarea
                                    name='description'
                                    value={course.description}
                                    onChange={handleChange}
                                    className='form-control'
                                    placeholder='Enter course description'
                                    rows='4'
                                    required
                                />
                            </div>
                            <div className='form-group'>
                                <label>Price</label>
                                <input
                                    type='number'
                                    name='price'
                                    value={course.price}
                                    onChange={handleChange}
                                    className='form-control'
                                    placeholder='Enter price'
                                    required
                                />
                            </div>
                            <div className='form-group'>
                                <label>Course Image</label>
                                <input
                                    type='file'
                                    name='imageUrl'
                                    onChange={handleChange}
                                    className='form-control-file'
                                    accept='image/*'
                                    required
                                />
                            </div>
                           {/*  <div className='form-group'>
                                <label>Upload Videos (Multiple)</label>
                                <input
                                    type='file'
                                    name='videos'
                                    onChange={handleChange}
                                    className='form-control-file'
                                    accept='video/*'
                                    multiple
                                    required
                                />
                            </div>*/}
                            <button type='submit' className='btn btn-primary mt-3'>
                                Save Course
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AddLecture;
