import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Courses.css';
import fullstackimg from '../components/Layout/fullstackimg.png';
import datascienceimg from '../components/Layout/datascienceimg.jpg';
import uiuximg from '../components/Layout/uiuximg.jpg';
import cloudcomputimg from '../components/Layout/cloudcomputimg.webp';
import cybersecurityimg from '../components/Layout/cybersecurityimg.jpg';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';


const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);

  // Static courses (if you still want to show them)
  const staticCourses = [
    {
      name: 'Full Stack Development',
      description: 'Master frontend and backend development with hands-on projects.',
      img: fullstackimg,
      price:<b>'RS.999'</b>
    },
    {
      name: 'Data Science',
      description: 'Learn data analysis, machine learning, and AI techniques.',
      img: datascienceimg,
      price:<b>'RS.899'</b>
    },
    {
      name: 'UI/UX Design',
      description: 'Design user-friendly and visually appealing interfaces.',
      img: uiuximg,
      price:<b>'RS.799'</b>
    },
    {
      name: 'Cloud Computing',
      description: 'Gain expertise in cloud platforms and services.',
      img: cloudcomputimg,
      price:<b>'RS.499'</b>
    },
    {
      name: 'Cybersecurity',
      description: 'Learn to protect systems and networks from cyber threats.',
      img: cybersecurityimg,
      price:<b>'RS.599'</b>
    },
  ];

  // Fetch courses from the backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/v1/auth/courses'); // API endpoint to get all courses
        setCourses(response.data);

         // Set fetched courses to state
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      <Header />
      <div className="courses-page">
        <h1>All Courses</h1>
        <div className="courses-grid">
          {/* Map through static courses */}
          {staticCourses.map((course, index) => (
            <div key={index} className="course-card">
              <img src={course.img} alt={course.name} className="course-img" />
              <h3>{course.name}</h3>
              <p>{course.description}</p>
              <p>{course.price}</p>
              <button className="enroll-button" onClick={() => navigate(`/courses/${index}`)}>
                Enroll Now
              </button>
            </div>
          ))}

          {/* Map through dynamic (fetched) courses */}
          {courses.map((course, index) => (
  <div key={index} className="course-card">
    {/* Log the course object */}
    {console.log(course)}
    {/* Ensure imageUrl is defined before rendering */}
    {course.imageUrl ? (
      <img src={`http://localhost:5000/${course.imageUrl}`} alt={course.name} className="course-img" />
    ) : (
      <p>No image available</p>
    )}
    <h3>{course.name}</h3>
    <p>{course.description}</p>
    <p><b>RS.{course.price}</b></p>
    <button className="enroll-button" onClick={() => navigate(`/payment`)}>
      Enroll Now
    </button>
  </div>
))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Courses;
