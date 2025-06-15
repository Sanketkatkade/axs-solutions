import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditOrder = () => {
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
  const { id } = useParams();

  // Fetch existing order data
  const fetchOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`http://localhost:5000/api/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data && res.data.order) {
        setFormData(res.data.order);
      } else {
        setErr('Order not found');
      }
    } catch (error) {
      console.error('Error fetching order:', error);
      setErr('Failed to fetch order');
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/orders/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Failed to update order:', error);
      setErr('Failed to update order');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Edit Order</h2>
      {err && <p style={{ color: 'red' }}>{err}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
        <input name="customerName" placeholder="Customer Name" value={formData.customerName} onChange={handleChange} required />
        <input name="email" placeholder="Email" type="email" value={formData.email} onChange={handleChange} required />
        <input name="productName" placeholder="Product Name" value={formData.productName} onChange={handleChange} required />
        <input name="quantity" placeholder="Quantity" type="number" value={formData.quantity} onChange={handleChange} required />
        <input name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} required />
        <textarea name="shippingAddress" placeholder="Shipping Address" value={formData.shippingAddress} onChange={handleChange} required />
        <button type="submit">Update Order</button>
      </form>
    </div>
  );
};

export default EditOrder;
