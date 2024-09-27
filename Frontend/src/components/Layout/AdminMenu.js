import React from 'react'
import { NavLink } from 'react-router-dom';
import '../../styles/Adminmenu.css';
const AdminMenu = () => {
    return (
        <>
            <div className='text-center'>
                <div className="list-group">
                    <h4>Admin Panel</h4>
                    <NavLink
                        to="/dashboard/admin/All-Course"
                        className="list-group-item list-group-item-action">
                        All Courses
                    </NavLink>
                    <NavLink
                        to="/dashboard/admin/add-lecture"
                        className="list-group-item list-group-item-action">
                        Add new Course
                    </NavLink>
                    <NavLink
                        to="/dashboard/admin/users"
                        className="list-group-item list-group-item-action">
                        Users
                    </NavLink>
                </div>
            </div>


        </>
    )
}

export default AdminMenu