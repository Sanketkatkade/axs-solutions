import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    productName: '',
    quantity: '',
    contactNumber: '',
    shippingAddress: '',
  });
  const [err, setErr] = useState('');

  // Fetch order details
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:5000/api/orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData(res.data); // Fill form with order data
      } catch (error) {
        console.error('Failed to fetch order:', error);
        setErr('Failed to load order details');
      }
    };

    fetchOrder();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const payload = {
        ...formData,
        quantity: Number(formData.quantity),
      };

      await axios.put(`http://localhost:5000/api/orders/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      alert('Order Updated!');
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Update failed:', error);
      setErr(error.response?.data?.message || 'Failed to update order');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Edit Order</h2>
      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((field) => (
          <div key={field}>
            <input
              type={field === 'email' ? 'email' : 'text'}
              name={field}
              placeholder={field}
              value={formData[field]}
              onChange={handleChange}
              required
            />
            <br /><br />
          </div>
        ))}
        {err && <p style={{ color: 'red' }}>{err}</p>}
        <button type="submit">Update Order</button>
      </form>
    </div>
  );
};

export default AdminEdit;
