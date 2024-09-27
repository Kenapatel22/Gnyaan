import React from 'react';
import '../Body.css';
import learnimg from './learnimg.jpg';
import { useNavigate } from 'react-router-dom'
import { FaCheckCircle } from 'react-icons/fa';
import { useAuth } from '../../context/auth';
//import Courses from '../../pages/Courses';
import fullstackimg from './fullstackimg.png';
import datascienceimg from './datascienceimg.jpg';
import uiuximg from './uiuximg.jpg';
import cloudcomputimg from './cloudcomputimg.webp';
import cybersecurityimg from './cybersecurityimg.jpg';

const Body = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();

  const popularCourses = [
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
      price:<b>'RS.699'</b>
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

  const reviews = [
    {
      name: 'John Doe',
      course: 'Full Stack Development',
      review: 'This course helped me land my dream job! The instructors were knowledgeable and supportive.',
    },
    {
      name: 'Jane Smith',
      course: 'Data Science',
      review: 'The hands-on projects were invaluable. I learned so much and felt prepared to enter the workforce.',
    },
    {
      name: 'Mark Johnson',
      course: 'UI/UX Design',
      review: 'Great course with practical examples. The design concepts were explained clearly and effectively.',
    },
    {
      name: 'Emily Davis',
      course: 'Cloud Computing',
      review: 'The course content was up-to-date and relevant. I highly recommend it to anyone looking to advance their career in cloud technologies.',
    },
  ];

  return (
    <div className="body">
     <section className="image-section">
        <div className="image-container">
          <img src={learnimg} alt="Attractive Visual" className="attractive-image" />
        </div>
      </section>
      <div className="get-started">
        <h1>Welcome to Gnyaan</h1>
        <p>Start your learning journey with us!</p>
        <button className="get-started-button" 
          onClick={() => {
            if (auth?.user){
              if(auth.user.role === true){
                navigate('/dashboard/admin');

              }else{
                navigate('/dashboard/user');
              }
            }else{
              navigate('/login');
            }
          }}
        
        > Get Started</button>
      </div>

      <div className="reviews-section">
        <h2>What Our Students Say</h2>
        <div className="reviews">
          {reviews.map((review, index) => (
            <div key={index} className="review-card">
              <h3>{review.name}</h3>
              <h4>{review.course}</h4>
              <p>"{review.review}"</p>
            </div>
          ))}
        </div>
      </div>

      <div className="working-process">
        <h2>How It Works</h2>
        <div className="process-steps">
          <div className="step">
            <FaCheckCircle className="step-icon" />
            <h4>Find Your Course</h4>
            <p>Browse through our wide range of courses and find the one that suits your needs.</p>
          </div>
          <div className="step">
            <FaCheckCircle className="step-icon" />
            <h4>Book Your Seat</h4>
            <p>Reserve your spot in the course that interests you and get ready to start learning.</p>
          </div>
          <div className="step">
            <FaCheckCircle className="step-icon" />
            <h4>Get Certified</h4>
            <p>Complete the course and earn your certification to showcase your new skills to the world.</p>
          </div>
        </div>
      </div>
      {/* New Popular Courses Section */}
      <div className="popular-courses-section">
        <h2>Popular Courses</h2>
        <div className="courses">
          {popularCourses.map((course, index) => (
            <div key={index} className="course-card">
              <img src={course.img} alt={course.name} className="course-img" />
              <h3>{course.name}</h3>
              <p>{course.description}</p>
              <p>{course.price}</p>
              <button className="enroll-button" 
              onClick={() =>{
                if (auth?.user){
                  navigate('/payment');
                }else{
                  navigate('/login');
                }
              }}>
                Enroll Now
              </button>
            </div>
          ))}
        </div>
         {/* View More Button */}
         <div className="view-more-container">
          <button className="view-more-button" onClick={() => navigate('/Courses')}>
            View More
          </button>
        </div>
      </div>

      <div className="benefits">
        <h2>Why Choose Us?</h2>
        <div className="benefits-list">
          <div className="benefit">
            <FaCheckCircle className="benefit-icon" />
            <p>Expert Instructors</p>
          </div>
          <div className="benefit">
            <FaCheckCircle className="benefit-icon" />
            <p>Comprehensive Materials</p>
          </div>
          <div className="benefit">
            <FaCheckCircle className="benefit-icon" />
            <p>Flexible Scheduling</p>
          </div>
          <div className="benefit">
            <FaCheckCircle className="benefit-icon" />
            <p>Certification Upon Completion</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
