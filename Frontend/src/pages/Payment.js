import React, { useState } from 'react';
import '../styles/Payment.css';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

const Payment = () => {
 
  const [formData, setFormData] = useState({
    cardholderName: '',
    email: '',
    termsAccepted: false,
  });
  const [loading, setLoading] = useState(false);
  const [paymentStatus] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

  }

  if (error) {
        setError(error.message);
        setSuccess(false);
        setLoading(false);
        return;
      }

  return (
    <div>
      <Header />
      <div className="payment-page">
        <h1>Complete Your Payment</h1>
        <form className="payment-form" onSubmit={handlePaymentSubmit}>
          <label>
            Cardholder Name
            <input
              type="text"
              name="cardholderName"
              value={formData.cardholderName}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Card Details</label>
           
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="termsAccepted"
              checked={formData.termsAccepted}
              onChange={handleChange}
              required
            />
            I accept the terms and conditions
          </label>
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">Payment Successful!</div>}
          {paymentStatus && <p className="payment-status">{paymentStatus}</p>}
          <button type="submit" className="pay-button" >
            {loading ? 'Processing...' : 'Pay Now'}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;
