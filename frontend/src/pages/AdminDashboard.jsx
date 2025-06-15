import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  // Fetch orders from backend
  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/admin/login');
        return;
      }

      const res = await axios.get('http://localhost:5000/api/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data && Array.isArray(res.data.orders)) {
        setOrders(res.data.orders);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      setErr('Failed to load orders');
    }
  };

  // Delete order
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(orders.filter(order => order._id !== id));
    } catch (error) {
      console.error('Failed to delete order:', error);
      setErr('Failed to delete order');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Dashboard</h2>
      <button onClick={handleLogout} style={{ float: 'right', marginBottom: '20px' }}>
        Logout
      </button>
      <button onClick={() => navigate('/admin/create-order')} style={{ marginBottom: '20px' }}>
        + Create New Order
      </button>

      {err && <p style={{ color: 'red' }}>{err}</p>}

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ marginTop: '20px', width: '100%' }}>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Contact</th>
              <th>Address</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.customerName}</td>
                <td>{order.email}</td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>{order.contactNumber}</td>
                <td>{order.shippingAddress}</td>
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td>
                  <button onClick={() => navigate(`/admin/edit-order/${order._id}`)}>Edit</button>
                  <button
                    onClick={() => handleDelete(order._id)}
                    style={{ marginLeft: '10px', color: 'red' }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
