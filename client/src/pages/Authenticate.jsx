import { useEffect, useState } from 'react';
import { Navigate, Link, useParams } from 'react-router-dom';
import { login, register } from '../services/authApi';
import { toast } from 'react-toastify';

function AuthForm() {
  const [mode, setMode] = useState('');
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const AUTH_SERVER_URL = import.meta.env.VITE_AUTH_SERVER_URL;
  const m = useParams().mode;

  useEffect(() => {
    if (m === 'login') {
      setMode('Login');
    } else if (m === 'signup') {
      setMode('Sign Up');
    } else {
      setMode('Login');
    }
  }, [m]);

  const handleSubmit = e => {
    e.preventDefault();
    setIsLoading(true);
    document.body.style.cursor = 'wait';

    if (!form.email || !form.password) {
      toast.error('Email and password are required');
      setIsLoading(false);
      document.body.style.cursor = 'default';
      return;
    }
    if (mode === 'Sign Up' && !form.username) {
      toast.error('Username is required!');
      setIsLoading(false);
      document.body.style.cursor = 'default';
      return;
    }

    if (mode === 'Login') {
      login(AUTH_SERVER_URL, form.email, form.password)
        .then(data => {
          if (data.token) {
            localStorage.setItem('token', data.token);
            setIsLoading(false);
            document.body.style.cursor = 'default';
            toast.success(`Login successful! Welcome`);
            setSuccess(true);
          } else {
            setIsLoading(false);
            document.body.style.cursor = 'default';
            toast.error(data.message || 'Login failed');
          }
        })
        .catch(err => {
          console.error('Login error:', err);
          toast.error('Login failed. Check network.');
          setIsLoading(false);
          document.body.style.cursor = 'default';
        });
    } else if (mode === 'Sign Up') {
      register(AUTH_SERVER_URL, form.username, form.email, form.password)
        .then(data => {
          if (data.token) {
            localStorage.setItem('token', data.token);
            setIsLoading(false);
            document.body.style.cursor = 'default';
            toast.success(`Registration successful! Welcome ${form.username || form.email}`);
            setSuccess(true);
          } else {
            setIsLoading(false);
            document.body.style.cursor = 'default';
            toast.error(data.message || 'Registration failed');
          }
        })
        .catch(err => {
          console.error('Registration error:', err);
          toast.error('Registration failed. Check network.');
          setIsLoading(false);
          document.body.style.cursor = 'default';
        });
    }
  };

  if (success) {
    return (
      <div>
        <Navigate to={'/dashboard'} />
      </div>
    );
  }

  return (
    <form
      className='form card'
      onSubmit={e => {
        handleSubmit(e);
      }}>
      <h2>{mode === 'Login' ? 'Login' : 'Sign Up'}</h2>
      <input type='email' placeholder='Email' value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      {mode === 'Sign Up' && (
        <>
          <input type='text' placeholder='Username' value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
        </>
      )}
      <input type='password' placeholder='Password' value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
      <button className='auth' type='submit' disabled={isLoading}>
        {isLoading ? 'Loading...' : mode}
      </button>
      <p onClick={() => setMode(mode === 'Login' ? 'signup' : 'login')}>
        {mode === 'Login' ? "You don't already have an account?  " : 'You already have an account?  '}
        <span className='link'>{mode === 'Login' ? 'Sign Up' : 'Sign In'}</span>
      </p>
      {mode === 'Login' && (
        <p>
          Forgot your password? <Link to='/auth/forgot-password'>Reset It</Link>
        </p>
      )}
    </form>
  );
}

export default AuthForm;
