import Navbar from './component/Layout/Navbar';
import Sidebar from './component/Layout/Sidebar';
import Footer from './component/Layout/Footer';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {

  return (
    <div className=''>
      <header className='header'>
        <Navbar />
      </header>
      <div className='body flex flex-row'>
        <div className='mr-3'>
          <Sidebar />
        </div>
        <div className='p-3'>
          <Outlet />
        </div>
      </div>
      <Footer />
      <ToastContainer position={window.innerWidth < 600 ? 'bottom-center' : 'top-right'} autoClose={3000} />
    </div>
  );
}
