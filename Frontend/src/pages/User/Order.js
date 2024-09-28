import React, { useState, useEffect } from 'react';
import Header from '../../components/Layout/Header';
import Footer from '../../components/Layout/Footer';
import UserMenu from '../../components/Layout/UserMenu';
import axios from 'axios';
import { useAuth } from '../../context/auth';
const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [auth] = useAuth();
    // Fetch orders from API
    const getOrders = async () => {
        try {
            const { data } = await axios.get('/api/v1/auth/orders');
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);
    // Check if orders array is empty
    if (!orders.length) {
        return (
            <div>
                <Header title={"Your Orders"} />
                <div className="container-fluid p-3 m-3">
                    <div className="row">
                        <div className="col-md-3">
                            <UserMenu />
                        </div>
                        <div className="col-md-9">
                            <h1 className="text-center">All Orders</h1>
                            <p>No orders found.</p> {/* Fallback message */}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
    return (
        <div>
            <Header title={"Your Orders"} />
            <div className="container-fluid p-3 m-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className="text-center">All Orders</h1>
                        {
                            orders?.map((o, i) => (
                                <div key={i} className="border shadow mb-3">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Buyer</th>
                                                <th scope="col">Order</th>
                                                <th scope="col">Payment</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row">{i + 1}</th>
                                                <td>{o.buyer?.name || "N/A"}</td>
                                                <td>{o._id}</td>
                                                <td>{o?.payment.success ? "Success" : "Failed"}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};
export default Orders;