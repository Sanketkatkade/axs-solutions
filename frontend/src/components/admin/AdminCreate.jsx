// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const AdminCreate = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     customerName: '',
//     email: '',
//     productName: '',
//     quantity: '',
//     contactNumber: '',
//     shippingAddress: '',
//   });

//   const [err, setErr] = useState('');

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErr('');

//     try {
//       const token = localStorage.getItem('token');
//       await axios.post('http://localhost:5000/api/orders', formData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       // ✅ Redirect to dashboard after success
//       navigate('/admin/dashboard');
//     } catch (error) {
//       console.error('Create failed:', error);
//       setErr('Failed to create order');
//     }
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Create New Order</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="customerName"
//           placeholder="Customer Name"
//           value={formData.customerName}
//           onChange={handleChange}
//           required
//         /><br /><br />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//           required
//         /><br /><br />

//         <input
//           type="text"
//           name="productName"
//           placeholder="Product Name"
//           value={formData.productName}
//           onChange={handleChange}
//           required
//         /><br /><br />

//         <input
//           type="number"
//           name="quantity"
//           placeholder="Quantity"
//           value={formData.quantity}
//           onChange={handleChange}
//           required
//         /><br /><br />

//         <input
//           type="text"
//           name="contactNumber"
//           placeholder="Contact Number"
//           value={formData.contactNumber}
//           onChange={handleChange}
//           required
//         /><br /><br />

//         <textarea
//           name="shippingAddress"
//           placeholder="Shipping Address"
//           value={formData.shippingAddress}
//           onChange={handleChange}
//           required
//         /><br /><br />

//         {err && <p style={{ color: 'red' }}>{err}</p>}

//         <button type="submit">Create Order</button>
//       </form>
//     </div>
//   );
// };

// export default AdminCreate;


import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminCreate = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState('');
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    productName: '',
    quantity: '',
    contactNumber: '',
    shippingAddress: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
  
      const payload = {
        ...formData,
        quantity: Number(formData.quantity), // ✅ Convert to Number
        contactNumber: formData.contactNumber.trim(), // ✅ Ensure no whitespace
        email: formData.email.trim(), // ✅ Validate email
      };
  
      const res = await axios.post('http://localhost:5000/api/orders', payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      alert('Order Created!');
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Order creation failed:', error.response?.data || error.message);
      setErr(error.response?.data?.message || 'Failed to create order');
    }
  };
  

  return (
    <div style={{ padding: '20px' }}>
      <h2>Create Order</h2>
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
        <button type="submit">Create Order</button>
      </form>
    </div>
  );
};

export default AdminCreate;
