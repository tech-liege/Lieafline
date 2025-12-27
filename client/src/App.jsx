import Navbar from './component/Layout/Navbar';
import Sidebar from './component/Layout/Sidebar';
import Footer from './component/Layout/Footer';
import LoadingOverlay from './component/LoadingOverlay';
import { Analytics } from '@vercel/analytics/react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useAuth, useVar } from './hooks/useAuth';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { FileUploaderMinimal } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';

export default function App() {
  const { token } = useAuth();
  const { isSideActive, toggleSidebar, loading } = useVar();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Navbar */}
      <Navbar />

      {/* Main Layout */}
      <div className="flex flex-1 mt-16">
        {/* Sidebar (only when logged in) */}
        {token && isSideActive && (
          <aside
            className="fixed block w-full h-full md:w-[13%]"
            onClick={window.innerWidth < 768 ? toggleSidebar : ""}>
            <Sidebar />
            <div className="opacity-40 bg-black w-full h-full md:hidden"></div>
          </aside>
        )}

        {/* Main Content Area */}
        <main
          className={`flex-1 bg-white rounded-tl-3xl shadow-md p-6 md:p-8 transition-colors ${
            isSideActive && window.innerWidth >= 768 && "ml-[13%]"
          }`}>
          <div className="w-full mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />

      {/* Loading Overlay */}
      {loading && <LoadingOverlay />}

      {/* Toast Notifications */}
      <ToastContainer
        position={window.innerWidth < 768 ? "bottom-center" : "top-right"}
        autoClose={3000}
        theme="light"
        toastClassName="!bg-white !text-gray-800 !shadow-md !rounded-xl"
        newestOnTop={true}
      />
      <Analytics />
      <div>
        <FileUploaderMinimal
           sourceList="local, camera, facebook, gdrive"
           cloudImageEditorAutoOpen={true}
           classNameUploader="uc-light"
           pubkey="eebd6ea77cac80e9dcdd"
        />
      </div>
    </div>
  );
}
