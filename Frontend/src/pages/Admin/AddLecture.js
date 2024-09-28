import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import AdminMenu from '../../components/Layout/AdminMenu';

const AddCourse = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(''); 
    const [image, setImage] = useState(null);
    const navigate = useNavigate(); // Using the navigate hook

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('image', image);  // Append image file

        try {
            await axios.post('/api/v1/auth/add-course', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // No alert here
        } catch (error) {
            console.error(error);
            alert('Error uploading course');
        }
    };

    const handleNavigation = async (e) => {
        await handleSubmit(e);  // First submit the form
        navigate('/dashboard/admin');  // Navigate after successful form submission
    };

    return (
        <div title={"Dashboard - Add Course"}>
            <Header />
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>Upload Course</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Course Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Course Description</label>
                                <textarea
                                    className="form-control"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <label>Course Price</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}  // Handle price change
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Upload Image</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files[0])}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={handleNavigation}>
                                Add Course
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AddCourse;