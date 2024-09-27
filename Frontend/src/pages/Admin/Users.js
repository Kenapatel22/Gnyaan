import React, { useEffect, useState } from 'react';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios'; // Ensure axios is installed
import '../../styles/Users.css'; // Custom CSS file for styling

const Users = () => {
    const [users, setUsers] = useState([]); // State to store user data
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch all users when the component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('/api/v1/auth/all-users');
                setUsers(response.data); // Check if response.data is an array
                setLoading(false);
            } catch (error) {
                console.error('Error fetching users:', error.response ? error.response.data : error.message);
                setLoading(false);
            }
        };
    
        fetchUsers();
    }, []);
    
    return (
        <div>
            <Header />
            <div title={'Dashboard - User Info'}>
                <div className='container-fluid m-3 p-3'>
                    <div className='row'>
                        <div className='col-md-3'>
                            <AdminMenu />
                        </div>
                        <div className='col-md-9'>
                            <h1>Users Info</h1>
                            {loading ? (
                                <p>Loading...</p> // Loading message
                            ) : (
                                <table className="user-table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Address</th>
                                            <th>Role</th>
                                            <th>Date & Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.length > 0 ? (
                                            users.map((user) => (
                                                <tr key={user.id}> {/* Ensure to replace with a unique key */}
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.phone || 'N/A'}</td>
                                                    <td>{user.address || 'N/A'}</td>
                                                    <td>{user.role || 'user'}</td>
                                                    <td>{new Date(user.createdAt).toLocaleString() || 'N/A'}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6">No users found</td> {/* Message when no users are present */}
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Users;
