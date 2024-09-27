import React, { useState } from 'react';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import UserMenu from '../../components/Layout/UserMenu';
import profilepic from './profilepic.jpg';
import '../../styles/Profile.css'; // Custom CSS file for styling
import { useAuth } from '../../context/auth';
import axios from 'axios';

const Profile = () => {
  const [auth, setAuth] = useAuth();
  
  // State for toggling the form
  const [editMode, setEditMode] = useState(false);
  
  // State for form data
  const [formData, setFormData] = useState({
    name: auth?.user?.name || '',
    email: auth?.user?.email || '',
    address: auth?.user?.address || '',
    phone: auth?.user?.phone || ''
  });
  
  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('/api/profile', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Update auth state with new user data
      const updatedUser = { ...auth.user, ...response.data };
      setAuth({ ...auth, user: updatedUser });
      setEditMode(false); // Hide the form after saving
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };
  
  return (
    <div className="profile-page">
      <Header />
      <div className="profile-container">
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9 profile-content">
              <div className="profile-header">
                <h1>Your Profile</h1>
                <p className="welcome-text">Welcome back! Manage your account and explore.</p>
              </div>
              <div className="profile-details">
                <div className="profile-card">
                  <img src={profilepic} alt="Profile" className="profile-picture" />
                  
                  {!editMode ? (
                    <div className="user-info">
                      <h3>Name: {auth?.user?.name}</h3>
                      <h4>Email: {auth?.user?.email}</h4>
                      <h4>Address: {auth?.user?.address || 'N/A'}</h4>
                      <h4>Phone: {auth?.user?.phone || 'N/A'}</h4>
                      <button
                        className="edit-profile-btn"
                        onClick={() => setEditMode(true)}
                      >
                        Edit Profile
                      </button>
                    </div>
                  ) : (
                    // Edit form when editMode is true
                    <form className="edit-profile-form" onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="phone">Phone:</label>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <button type="submit" className="save-profile-btn">
                        Save Changes
                      </button>
                      <button
                        type="button"
                        className="cancel-edit-btn"
                        onClick={() => setEditMode(false)}
                      >
                        Cancel
                      </button>
                    </form>
                  )}
                </div>

                <div className="profile-stats">
                  <div className="stat-card">
                    <h3>Recent Orders</h3>
                  </div>
                  <div className="stat-card">
                    <h3>Courses Enrolled</h3>
                  </div>
                  <div className="stat-card">
                    <h3>Account Status</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
