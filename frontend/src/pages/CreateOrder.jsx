import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateOrder = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    productName: '',
    quantity: '',
    contactNumber: '',
    shippingAddress: '',
  });

  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/orders', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Failed to create order:', error);
      setErr('Failed to create order');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Create New Order</h2>
      {err && <p style={{ color: 'red' }}>{err}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        <input name="customerName" placeholder="Customer Name" value={formData.customerName} onChange={handleChange} required />
        <input name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} required />
        <input name="productName" placeholder="Product Name" value={formData.productName} onChange={handleChange} required />
        <input name="quantity" placeholder="Quantity" type="number" value={formData.quantity} onChange={handleChange} required />
        <input name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} required />
        <textarea name="shippingAddress" placeholder="Shipping Address" value={formData.shippingAddress} onChange={handleChange} required />
        <button type="submit">Create Order</button>
      </form>
    </div>
  );
};

export default CreateOrder;
