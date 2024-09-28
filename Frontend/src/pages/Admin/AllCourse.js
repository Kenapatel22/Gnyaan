import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import AdminMenu from '../../components/Layout/AdminMenu';
import '../../styles/Allcours.css';

const AllCourse = () => {
    const [courses, setCourses] = useState([]); // Initialize state for courses

    // Fetch courses from the backend
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch('/api/v1/auth/courses'); // Adjust API endpoint as needed
                const data = await response.json();
                setCourses(data); // Set the fetched courses to state
            } catch (error) {
                console.error("Error fetching courses:", error); // Handle errors here
            }
        };

        fetchCourses();
    }, []); // Empty dependency array to fetch on component mount

    const handleDelete = async (courseId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this course?");
        if (confirmDelete) {
            try {
                const response = await fetch(`/api/v1/auth/courses/${courseId}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    // Filter out the deleted course
                    setCourses(courses.filter(course => course._id !== courseId));
                    alert("Course deleted successfully.");
                } else {
                    const errorData = await response.json();
                    console.error("Failed to delete course:", errorData);
                }
            } catch (error) {
                console.error("Error deleting course:", error);
            }
        }
    };
    
    return (
        <div>
            <Header />
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>All Courses</h1>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                                                    <tbody>
                            {courses.length > 0 ? ( // Check if courses are available
                                courses.map((course) => (
                                    <tr key={course._id}> {/* Ensure unique key for each course */}
                                        <td>{course.name}</td>
                                        <td>{course.description}</td>
                                        <td>{course.price}</td>
                                        <td>
                                        <Link to={`/dashboard/admin/edit-course/${course._id}`} className="btn btn-warning">Edit</Link>

                                            <button 
                                                className="btn btn-danger"
                                                onClick={() => handleDelete(course._id)} // Attach delete handler
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                <td colSpan="4">
                                    No courses available. 
                                    <Link to="/dashboard/admin/add-course" className="btn btn-primary">Add a Course</Link>
                                </td>

                                </tr>
                            )}
                        </tbody>

                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default AllCourse;
