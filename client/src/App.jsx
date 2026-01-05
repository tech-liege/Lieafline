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
// import { FileUploaderMinimal } from '@uploadcare/react-uploader';
// import '@uploadcare/react-uploader/core.css';

export default function App() {
  const { token } = useAuth();
  const { isSideActive, toggleSidebar, loading, inLoading, inLoadingText, inFullScreen, fullScreenHeader} = useVar();
 
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      {/* Navbar */}
      {!inFullScreen && <Navbar />}

      {/* Main Layout */}
      <div className={"flex flex-1 " + (!inFullScreen && "mt-16")}>
        {/* Sidebar (only when logged in) */}
        {token && isSideActive && !inFullScreen && (
          <aside
            className="fixed block w-full h-full md:w-[100%] transition-all"
            onClick={window.innerWidth < 768 ? toggleSidebar : ""}
          >
            <Sidebar />
            <div className="opacity-40 bg-black w-full h-full md:hidden"></div>
          </aside>
        )}

        {/* Main Content Area */}
        <main
          className={`flex flex-1 bg-gray-100 min-h-fit min-w-fit rounded-t-3xl shadow-md transition-all duration-75 ${
            !inFullScreen ? ("p-6 md:p-8 " + (isSideActive && "md:ml-[10%]")) : "p-1 md:p-2"
          }`}
        >
          <div className="w-full rounded-2xl mx-auto min-h-[80vh]">
            {inFullScreen && (
              <div className="bg-green-700 text-white font-bold text-center text-2xl p-1 md:p-2 rounded-t-2xl">
                {fullScreenHeader}
              </div>
            )}
            {inLoading ? (
              <div className="min-h-[80vh] w-full flex items-center bg-gray-50 shadow-inner shadow-gray-800 rounded-2xl">
                <div className="w-full h-fit">
                  <img
                    src="/stats.gif"
                    alt="Loading GIF"
                    className="w-20 h-20 mx-auto"
                  />
                  <div className="text-center w-full text-2xl text-gray-300">
                    {inLoadingText}
                  </div>
                </div>
              </div>
            ) : (
              <Outlet />
            )}
          </div>
        </main>
      </div>

      {/* Footer */}
      {!inFullScreen && <Footer />}

      {/* Loading Overlay */}
      {loading && <LoadingOverlay />}

      {/* Toast Notifications */}
      <ToastContainer
        position={window.innerWidth < 768 ? "bottom-center" : "top-right"}
        autoClose={3000}
        theme="light"
        toastClassName="!bg-emerald-50 !text-gray-800 !shadow-md !rounded-xl"
        newestOnTop={false}
      />
      <Analytics />
      {/* <div>
        <FileUploaderMinimal
          sourceList="local, camera, facebook, gdrive"
          cloudImageEditorAutoOpen={true}
          classNameUploader="uc-light"
          pubkey="eebd6ea77cac80e9dcdd"
        />
      </div> */}
    </div>
  );
}
