import { useRouteError } from 'react-router-dom';

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className='flex flex-col items-center justify-center h-screen text-center p-4'>
      <h1 className='text-4xl font-bold text-red-600'>Oops!</h1>

      <p className='text-lg mt-2'>Something went wrong.</p>
      <i>{error.status}</i>
      <p className='mt-4 text-sm text-gray-600'>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export default ErrorPage;