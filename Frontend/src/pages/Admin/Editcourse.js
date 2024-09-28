import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';

const EditCourse = () => {
    const { id } = useParams(); // Get the course ID from the URL
    const navigate = useNavigate(); // Use useNavigate instead of useHistory
    const [courseData, setCourseData] = useState({
        name: '',
        description: '',
        price: '',
        // Add other fields as necessary
    });

    useEffect(() => {
        // Fetch the course data by ID
        const fetchCourse = async () => {
            const response = await fetch(`/api/v1/auth/courses/${id}`); // Adjust API endpoint as needed
            const data = await response.json();
            setCourseData(data);
        };

        fetchCourse();
    }, [id]);

    const handleChange = (e) => {
        setCourseData({ ...courseData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/v1/auth/courses/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(courseData),
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error updating course:", errorData);
                // Handle error case
                return;
            }
            
            // If successful
            navigate('/dashboard/admin/All-Course'); // Redirect to the all courses page after editing
        } catch (error) {
            console.error("Network or server error:", error);
        }
    };
    
    return (
        <div>
            <Header />
            <div className="container">
                <h1>Edit Course</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={courseData.name}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={courseData.description}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Price</label>
                        <input
                            type="number"
                            name="price"
                            value={courseData.price}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>
                    {/* Add more fields as needed */}
                    <button type="submit" className="btn btn-primary">Update Course</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default EditCourse;
