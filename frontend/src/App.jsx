import { Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminCreate from './components/admin/AdminCreate';
import AdminEdit from './components/admin/AdminEdit';
import AdminSignup from './components/admin/AdminSignup';
import PrivateRoute from './components/PrivateRoute'; // ✅ import

function App() {
  return (
    <Routes>
      <Route path="/" element={<AdminLogin />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/signup" element={<AdminSignup />} />

      {/* 🔐 Protected Routes */}
      <Route path="/admin/dashboard" element={<PrivateRoute><AdminDashboard /></PrivateRoute>} />
      <Route path="/admin/create" element={<PrivateRoute><AdminCreate /></PrivateRoute>} />
      <Route path="/admin/edit/:id" element={<PrivateRoute><AdminEdit /></PrivateRoute>} />
    </Routes>
  );
}

export default App;
