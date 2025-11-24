import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { resetPasswordApi, verifyResetToken } from '../services/authApi';
import { toast } from 'react-toastify';
import { useAuth, useVar } from '../hooks/useAuth';

function ResetPassword() {
  const [resetToken, setResetToken] = useState('');
  const [valid, setValid] = useState(false);
  const [password, setPassword] = useState('');
  const [checking, setChecking] = useState(true);
  const [success, setSuccess] = useState(false);

  const { token } = useParams();

  const { AUTH_SERVER_URL } = useAuth();
  const { loading, toggleLoading } = useVar();

  useEffect(() => {
    setResetToken(token || '');
  }, [token]);

  useEffect(() => {
    if (!resetToken) return;

    const verifyToken = async () => {
      try {
        const data = await verifyResetToken(AUTH_SERVER_URL, resetToken);
        setValid(data.isValid);
      } catch {
        toast.error('Internal Server Error');
      } finally {
        setChecking(false);
      }
    };

    verifyToken();
  }, [resetToken, AUTH_SERVER_URL]);

  const handleSubmit = async e => {
    e.preventDefault();
    toggleLoading(true);

    try {
      const data = await resetPasswordApi(AUTH_SERVER_URL, resetToken, password);

      if (data.message === 'Invalid or expired token') {
        toast.error('Invalid or expired token');
      } else if (data.message === 'Password reset successful') {
        toast.success('Password reset successful');
        setPassword('');
        setSuccess(true);
      }
    } catch {
      toast.error('Failed to reset password');
    } finally {
      toggleLoading(false);
    }
  };

  // 🌀 Loading States
  if (checking) {
    return <div className='flex h-[70vh] items-center justify-center text-gray-500 text-sm'>Verifying token...</div>;
  }

  if (!valid) {
    return (
      <div className='flex flex-col items-center justify-center h-[70vh] text-center'>
        <h2 className='text-lg font-semibold text-gray-800 mb-2'>Invalid or Expired Link</h2>
        <p className='text-gray-500 text-sm max-w-sm'>
          The password reset link is no longer valid. Please request a new one from the login page.
        </p>
      </div>
    );
  }

  if (success) {
    return <Navigate to='/auth/login' replace />;
  }

  // ✅ Main Reset Form
  return (
    <main className='flex min-h-[80vh] items-center justify-center bg-gray-50 p-6'>
      <div className='w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-200 p-8'>
        <h2 className='text-2xl font-bold text-gray-800 mb-2 text-center'>Reset Password</h2>
        <p className='text-sm text-gray-500 mb-6 text-center'>Enter a new password to secure your account.</p>

        <form onSubmit={handleSubmit} className='space-y-5'>
          <div>
            <label htmlFor='newPassword' className='block text-sm font-medium text-gray-700 mb-1'>
              New Password
            </label>
            <input
              id='newPassword'
              type='password'
              name='newPassword'
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder='Enter your new password'
              className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50 text-gray-800'
              required
            />
          </div>

          <button
            type='submit'
            disabled={loading}
            className={`w-full py-2 rounded-lg text-white font-medium shadow-sm transition-colors ${
              loading ? 'bg-emerald-400 cursor-not-allowed' : 'bg-emerald-500 hover:bg-emerald-600'
            }`}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </main>
  );
}

export default ResetPassword;
