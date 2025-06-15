import { useState } from 'react';
import axios from 'axios';

const CustomerOrderForm = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    contactNumber: '',
    shippingAddress: '',
    productName: '',
    quantity: '',
  });

  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic input validation
    if (
      formData.customerName.length < 3 ||
      formData.customerName.length > 30 ||
      !/^\S+@\S+\.\S+$/.test(formData.email) ||
      !/^\d{10}$/.test(formData.contactNumber) ||
      formData.shippingAddress.length > 100 ||
      formData.productName.length < 3 ||
      formData.productName.length > 50 ||
      formData.quantity < 1 ||
      formData.quantity > 100
    ) {
      alert('Please enter valid inputs.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/orders', formData);
      setSuccess('Order placed successfully!');
      setFormData({
        customerName: '',
        email: '',
        contactNumber: '',
        shippingAddress: '',
        productName: '',
        quantity: '',
      });
    } catch (error) {
      console.error(error);
      alert('Failed to place order.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Place Order</h2>
      <form onSubmit={handleSubmit}>
        <input name="customerName" value={formData.customerName} onChange={handleChange} placeholder="Customer Name" required /><br />
        <input name="email" value={formData.email} onChange={handleChange} placeholder="Email" required /><br />
        <input name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="Contact Number" required /><br />
        <input name="shippingAddress" value={formData.shippingAddress} onChange={handleChange} placeholder="Shipping Address" required /><br />
        <input name="productName" value={formData.productName} onChange={handleChange} placeholder="Product Name" required /><br />
        <input name="quantity" type="number" value={formData.quantity} onChange={handleChange} placeholder="Quantity" required /><br />
        <button type="submit">Submit Order</button>
      </form>
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default CustomerOrderForm;
