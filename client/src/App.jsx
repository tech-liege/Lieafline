import Navbar from './component/Layout/Navbar';
import Sidebar from './component/Layout/Sidebar';
import Footer from './component/Layout/Footer';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useAuth } from './hooks/useAuth';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

export default function App() {
  const { token } = useAuth();

  return (
    <div className=''>
      <Navbar />
      <div className='flex flex-row min-h-screen'>
        {token && <Sidebar />}
        <div className='body'>
          <Outlet />
        </div>
      </div>
      <Footer />
      <ToastContainer position={window.innerWidth < 768 ? 'bottom-center' : 'top-right'} autoClose={3000} />
    </div>
  );
}
