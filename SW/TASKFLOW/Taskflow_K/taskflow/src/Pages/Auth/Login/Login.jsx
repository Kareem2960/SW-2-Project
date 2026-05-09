import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../../Components/Auth/Login/Login';

const Login = () => {
  const navigate = useNavigate();

  const handleLoginSuccess = (user) => {
    const userRole = user?.role?.toLowerCase();
    // Treat 'teammember' as 'member'
    const normalizedUserRole = userRole === 'teammember' ? 'member' : userRole;
    if (normalizedUserRole === 'admin') {
      navigate('/admin');
    } else if (normalizedUserRole === 'manager') {
      navigate('/manager');
    } else {
      navigate('/member');
    }
  };

  return <LoginForm onSuccess={handleLoginSuccess} />;
};

export default Login
