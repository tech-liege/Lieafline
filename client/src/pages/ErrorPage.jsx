import { useRouteError, Link } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-800 px-6'>
      <div className='bg-white shadow-md rounded-2xl p-10 max-w-md w-full text-center'>
        <h1 className='text-5xl font-bold text-blue-600 mb-4'>Oops!</h1>

        <p className='text-lg mb-2'>Something went wrong.</p>

        {error?.status && (
          <div className='text-sm text-gray-500 mb-2'>
            <strong>Status:</strong> {error.status}
          </div>
        )}

        <p className='text-sm text-gray-600 italic mb-6'>{error?.statusText || error?.message || 'An unexpected error occurred.'}</p>

        <Link to='/' className='inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg transition-colors'>
          Go Home
        </Link>
      </div>

      <footer className='mt-8 text-gray-400 text-xs'>&copy; {new Date().getFullYear()} Lieafline — All rights reserved.</footer>
    </div>
  );
}
