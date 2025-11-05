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
    <div className='min-h-screen flex flex-col bg-gray-50 text-gray-800'>
      {/* Navbar */}
      <Navbar />

      {/* Main Layout */}
      <div className='flex flex-1'>
        {/* Sidebar (only when logged in) */}
        {token && (
          <aside className='hidden md:block w-64 bg-white border-r border-gray-200 shadow-sm'>
            <Sidebar />
          </aside>
        )}

        {/* Main Content Area */}
        <main className='flex-1 bg-white rounded-tl-3xl shadow-sm p-6 md:p-8 transition-colors'>
          <div className='max-w-6xl mx-auto'>
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Toast Notifications */}
      <ToastContainer
        position={window.innerWidth < 768 ? 'bottom-center' : 'top-right'}
        autoClose={3000}
        theme='light'
        toastClassName='!bg-white !text-gray-800 !shadow-md !rounded-xl'
      />
    </div>
  );
}
