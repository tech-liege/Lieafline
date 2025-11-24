import { useEffect, useState } from 'react';
import { Navigate, Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, register } from '../services/authApi';
import { useAuth, useVar } from '../hooks/useAuth';

export default function AuthForm() {
  const [mode, setMode] = useState('Login');
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [success, setSuccess] = useState(false);

  const { loginContext, AUTH_SERVER_URL } = useAuth();
  const { loading, toggleLoading } = useVar();
  const { routeMode } = useParams();

  useEffect(() => {
    if (routeMode === 'signup') setMode('Sign Up');
    else setMode('Login');
  }, [routeMode]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    toggleLoading(true);

    try {
      if (!form.email || !form.password) {
        toast.error('Email and password are required');
        return;
      }
      if (mode === 'Sign Up' && !form.username) {
        toast.error('Username is required!');
        return;
      }

      const action = mode === 'Login' ? login : register;
      const args =
        mode === 'Login' ? [AUTH_SERVER_URL, form.email, form.password] : [AUTH_SERVER_URL, form.username, form.email, form.password];

      const data = await action(...args);

      if (data.token) {
        loginContext(data.token);
        toast.success(
          mode === 'Login' ? 'Login successful! Welcome back 🎉' : `Registration successful! Welcome ${form.username || form.email} 🎉`
        );
        setSuccess(true);
      } else {
        toast.error(data.message || `${mode} failed`);
      }
    } catch {
      toast.error(`${mode} failed. Check your network.`);
    } finally {
      toggleLoading(false);
    }
  };

  if (success) return <Navigate to='/dashboard' />;

  return (
    <div className='min-h-[80vh] flex items-center justify-center bg-gray-50 px-4'>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-md bg-white rounded-2xl shadow-lg p-8 border border-gray-100 transition-all duration-300'>
        <h2 className='text-3xl font-semibold text-blue-600 text-center mb-6'>{mode}</h2>

        {/* Email */}
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={form.email}
          onChange={handleChange}
          required
          className='w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700'
        />

        {/* Username for Sign Up */}
        {mode === 'Sign Up' && (
          <input
            type='text'
            name='username'
            placeholder='Username'
            value={form.username}
            onChange={handleChange}
            required
            className='w-full mb-4 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700'
          />
        )}

        {/* Password */}
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={form.password}
          onChange={handleChange}
          required
          className='w-full mb-6 px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none text-gray-700'
        />

        {/* Submit button */}
        <button
          type='submit'
          disabled={loading}
          className={`w-full py-2.5 font-medium rounded-md text-white transition ${
            loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}>
          {loading ? 'Please wait...' : mode}
        </button>

        {/* Switch between modes */}
        <p
          onClick={() => setMode(mode === 'Login' ? 'Sign Up' : 'Login')}
          className='mt-4 text-center text-sm text-gray-600 cursor-pointer'>
          {mode === 'Login' ? "Don't have an account? " : 'Already have an account? '}
          <span className='text-blue-600 hover:underline'>{mode === 'Login' ? 'Sign Up' : 'Sign In'}</span>
        </p>

        {/* Forgot password link */}
        {mode === 'Login' && (
          <p className='text-center text-sm mt-3 text-gray-500'>
            Forgot your password?{' '}
            <Link to='/auth/forgot-password' className='text-blue-600 hover:underline'>
              Reset it
            </Link>
          </p>
        )}
      </form>
    </div>
  );
}
