import DropIn from "braintree-web-drop-in-react";
import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const Payment = () => {
    const [auth] = useAuth();
    const [clientToken, setClientToken] = useState(null); // Initialize as null
    const [instance, setInstance] = useState(null);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();
    // Get payment gateway token
    const getToken = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/braintree/token');
            setClientToken(data?.clientToken);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getToken();
    }, [auth?.token]);
    // Handle payment submission
    const handlePayment = async () => {
        setLoading(true);
        try {
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post('/api/v1/product/braintree/payment', {
                nonce
            });
            setLoading(false);
            setSuccessMessage("Payment successful!");
            navigate('/dashboard/user')
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };
    return (
        <div>
            {clientToken ? (
                <>
                    <DropIn
                        options={{
                            authorization: clientToken,
                            paypal: {
                                flow: 'vault'
                            }
                        }}
                        onInstance={instance => setInstance(instance)} // Correctly set the instance
                    />
                    <button
                        type="submit"
                        className="pay-button"
                        onClick={handlePayment}
                        disabled={!instance || loading} // Disable button if no instance or loading
                    >
                        {loading ? "Processing..." : "Make Payment"}
                    </button>
                    {successMessage && <div className="success-message">{successMessage}</div>} {/* Display message */}
                </>
            ) : (
                <div>Loading payment gateway...</div> // Show loading while clientToken is null
            )}
        </div>
    );
};
export default Payment;