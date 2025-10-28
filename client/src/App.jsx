import Navbar from './component/Layout/Navbar';
import Sidebar from './component/Layout/Sidebar';
import Footer from './component/Layout/Footer';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token') || '');
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <div className=''>
      <Navbar />
      <div className=''>
        {token && <Sidebar />}
        <div className=''>
          <Outlet />
        </div>
      </div>
      <Footer />
      <ToastContainer position={window.innerWidth < 600 ? 'bottom-center' : 'top-right'} autoClose={3000} />
    </div>
  );
}
