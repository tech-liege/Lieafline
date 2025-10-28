import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='m-4 lg:container'>
      <div className='flex flex-row flex-wrap w-full h-auto m-auto'>
        <div className='w-full h-auto lg:h-1/3 lg:w-2/3 p-2 justify-self-center self-center flex flex-col justify between'>
          <div>
            <h1 className='text-3xl font-bold text-center font-serif'>Welcome to Lieafline 🌱</h1>
            <p className='text-center mt-4 text-gray-700 font-mono'>Start tracking your growth, one skill at a time.</p>
          </div>
          <Link to={'/authenticate'} className='btn btn-secondary w-auto self-center m-4 lg:self-start'>
            Get Started
          </Link>
        </div>
        <div className='w-1/3 h-1/3 hidden lg:block'>
          <img src='/mtn-fx.jpg' alt='placeholder' />
        </div>
      </div>
    </div>
  );
}

export default Home;
