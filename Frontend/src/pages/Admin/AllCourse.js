import React from 'react'
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import AdminMenu from '../../components/Layout/AdminMenu'

const AllCourse = () => {
    return (
        <div >
        <Header />
            <div className='contain-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1>All-Courses</h1>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AllCourse;