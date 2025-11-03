import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { resetPasswordApi, verifyResetToken } from '../services/authApi';
import { toast } from 'react-toastify';

function ResetPassword() {
  const [resetToken, setResetToken] = useState('');
  const [valid, setValid] = useState(false);
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [success, setSuccess] = useState(false);

  const { token, AUTH_SERVER_URL } = useParams();
  useEffect(() => {
    if (token) setResetToken(token);
    else setResetToken(null);
  }, [token]);

  useEffect(() => {
    if (!resetToken) return;
    verifyResetToken(AUTH_SERVER_URL, resetToken)
      .then(data => {
        setValid(data.isValid);
      })
      .catch(() => toast.error('Internal Server Error'))
      .finally(() => setChecking(false));
  }, [resetToken, AUTH_SERVER_URL]);

  if (success)
    return (
      <div>
        <Navigate to={'/auth/login'} />
      </div>
    );
  if (checking) return <div>Verifying token...</div>;
  if (!valid) return <div>Invalid or expired token</div>;

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await resetPasswordApi(AUTH_SERVER_URL, resetToken, password);
      if (data.message === 'Invalid or expired token') {
        toast.error('Invalid or expired token');
      } else if (data.message === 'Password reset successful') {
        setPassword('');
        toast.success('Password reset successful');
        setSuccess(true);
      }
    } catch {
      toast.error('Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form onSubmit={e => handleSubmit(e)}>
        <label>
          New Password:
          <input
            type='password'
            name='newPassword'
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder='Enter your new password'
            required
          />
        </label>
        <button type='submit' disabled={isLoading}>
          {isLoading ? 'Loading' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
