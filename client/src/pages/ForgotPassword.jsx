import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { forgotPassword } from '../services/authApi';
import { useAuth } from '../hooks/useAuth';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { AUTH_SERVER_URL } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = await forgotPassword(AUTH_SERVER_URL, email);

      if (data.message === 'Email not found') {
        toast.error('Email not found');
      } else if (data.message === 'Reset link sent') {
        toast.success('Reset link sent! Please check your inbox (might take a minute).');
        setEmail('');
      }
    } catch {
      toast.error('Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className='flex min-h-screen items-center justify-center bg-gray-50 p-6'>
      <div className='w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-200 p-8'>
        <h2 className='text-2xl font-bold text-gray-800 mb-2 text-center'>Forgot Password</h2>
        <p className='text-sm text-gray-500 mb-6 text-center'>
          Enter your account email, and we’ll send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className='space-y-5'>
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
              Email Address
            </label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder='you@example.com'
              required
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50 text-gray-800'
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-medium shadow-sm transition-colors ${
              loading ? 'bg-emerald-400 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-600'
            }`}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>

          <p className='text-sm text-gray-600 text-center mt-4'>
            Remembered your password?{' '}
            <Link to='/auth/login' className='text-emerald-600 hover:text-emerald-700 font-medium transition-colors'>
              Login
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}

export default ForgotPassword;
