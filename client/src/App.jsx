import Navbar from './component/Layout/Navbar';
import Sidebar from './component/Layout/Sidebar';
import Footer from './component/Layout/Footer';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

export default function App() {
  const [token, setToken] = useState('');
  if (localStorage.getItem('token')) {
    setToken(localStorage.getItem('token'));
  }

  return (
    <div className=''>
      <Navbar />
      <div className=''>
        {token ? (
          <div className=''>
            <Sidebar />
          </div>
        ) : (
          ''
        )}
        <div className=''>
          <Outlet />
        </div>
      </div>
      <Footer />
      <ToastContainer position={window.innerWidth < 600 ? 'bottom-center' : 'top-right'} autoClose={3000} />
    </div>
  );
}
