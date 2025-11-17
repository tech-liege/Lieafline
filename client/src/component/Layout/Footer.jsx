export default function Footer() {
  return (
    <footer className='w-full bg-white border-t border-gray-200 shadow-sm mt-auto z-20'>
      <div className='max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500'>
        <p>
          © {new Date().getFullYear()} <span className='font-semibold text-gray-700'>Lieafline</span> — Built with ❤️
        </p>

        <div className='mt-2 md:mt-0 flex gap-4'>
          <a href='#' className='hover:text-gray-700 transition-colors'>
            Privacy
          </a>
          <a href='#' className='hover:text-gray-700 transition-colors'>
            Terms
          </a>
          <a href='#' className='hover:text-gray-700 transition-colors'>
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
