import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminSignup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setErr('');
    setSuccess('');

    try {
      const res = await axios.post('http://localhost:5000/api/admin/signup', {
        email,
        password,
      });

      if (res.data && res.data.message) {
        setSuccess('Signup successful! Please log in.');
        setEmail('');
        setPassword('');
        setTimeout(() => navigate('/admin/login'), 1500);
      }
    } catch (error) {
      console.error('Signup failed:', error);
      setErr('Signup failed. Email may already exist.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Signup</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>Password:</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {err && <p style={{ color: 'red' }}>{err}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button type="submit" style={{ marginTop: '15px' }}>
          Signup
        </button>
      </form>
    </div>
  );
};

export default AdminSignup;
