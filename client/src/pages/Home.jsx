import { Link } from 'react-router-dom';

function Home() {
  return (
    <section className='hero min-h-[80vh] bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white overflow-hidden'>
      <div className='hero-content flex-col lg:flex-row-reverse items-center gap-8 lg:gap-16'>
        {/* Right Side Image */}
        <img
          src='/Lieafline_hero_banner_1.png'
          alt='Lieafline Growth Illustration'
          className='max-w-sm lg:max-w-md rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500'
        />

        {/* Left Side Text */}
        <div className='text-center lg:text-left max-w-lg'>
          <h1 className='text-4xl md:text-5xl font-extrabold font-serif leading-tight'>
            Welcome to <span className='text-green-400'>Lieafline</span> 🌱
          </h1>
          <p className='py-6 text-gray-300 font-mono text-lg'>
            Track your growth, one skill at a time — and watch your journey flourish 🌿
          </p>
          <Link
            to='/auth/login'
            className='btn btn-secondary btn-lg normal-case font-semibold shadow-md hover:shadow-xl transition-all duration-300'>
            Get Started
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Home;
