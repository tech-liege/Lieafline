import { useState } from 'react';
import { Navigate, Link, useParams } from 'react-router-dom';
import { login, register } from '../services/authApi';
import { toast } from 'react-toastify';

function AuthForm() {
  const [mode, setMode] = useState(useParams().mode || 'login');
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState();

  const AUTH_SERVER_URL = import.meta.env.VITE_AUTH_SERVER_URL;
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
    if (mode === 'register' && !form.username) {
      toast.error('Username is required!');
      setIsLoading(false);
      document.body.style.cursor = 'default';
      return;
    }

    if (mode === 'login') {
      login(AUTH_SERVER_URL, form.email, form.password)
        .then(data => {
          if (data.token) {
            localStorage.setItem('token', data.token);
            setToken(data.token);
            setIsLoading(false);
            document.body.style.cursor = 'default';
            toast.success(`Login successful! Welcome`);
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
    } else if (mode === 'register') {
      register(AUTH_SERVER_URL, form.username, form.email, form.password)
        .then(data => {
          if (data.token) {
            localStorage.setItem('token', data.token);
            setToken(data.token);
            setIsLoading(false);
            document.body.style.cursor = 'default';
            toast.success(`Registration successful! Welcome ${form.username || form.email}`);
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
    setTimeout(() => {
      if (!token) {
        return;
      }
      return <Navigate to={'/dashboard'} />;
    }, 3000);
  };

  return (
    <form
      className='form card'
      onSubmit={e => {
        handleSubmit(e);
      }}>
      <h2>{mode === 'login' ? 'Login' : 'Sign Up'}</h2>
      <input type='email' placeholder='Email' value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
      {mode === 'signup' && (
        <>
          <input type='text' placeholder='Username' value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} />
        </>
      )}
      <input type='password' placeholder='Password' value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
      <button className='auth' type='submit' disabled={isLoading}>
        {isLoading ? 'Loading...' : mode}
      </button>
      <p onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
        {mode === 'login' ? "You don't already have an account?  " : 'You already have an account?  '}
        <span className='link'>{mode === 'login' ? 'Sign Up' : 'Sign In'}</span>
      </p>
      {mode === 'login' && (
        <p>
          Forgot your password? <Link to='/forgot-password'>Reset It</Link>
        </p>
      )}
    </form>
  );
}

export default AuthForm;
