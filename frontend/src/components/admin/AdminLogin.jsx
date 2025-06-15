import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErr('');

    try {
      const res = await axios.post('http://localhost:5000/api/admin/login', {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      setErr('Invalid email or password');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit" style={{ marginTop: '15px' }}>
          Login
        </button>
      </form>

      {/* Signup Link */}
      <p style={{ marginTop: '20px' }}>
        Not registered?{' '}
        <button onClick={() => navigate('/admin/signup')} style={{ color: 'blue', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>
          Signup here
        </button>
      </p>
    </div>
  );
};

export default AdminLogin;
