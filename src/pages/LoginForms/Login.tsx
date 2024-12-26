import { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleProvider, facebookProvider } from '../../services/firebase';
import { FaGoogle, FaFacebook } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (method: 'email' | 'google' | 'facebook', email?: string, password?: string) => {
    setLoading(true);
    setErrorMessage('');

    try {
      if (method === 'email') {
        if (!email || !password) throw new Error('Email and password are required');
        await signInWithEmailAndPassword(auth, email, password);
        alert('Logged in successfully');
        navigate('/dashboard');
      } else if (method === 'google') {
        await signInWithPopup(auth, googleProvider);
        alert('Google Sign In Successful');
      } else if (method === 'facebook') {
        await signInWithPopup(auth, facebookProvider);
        alert('Facebook Sign In Successful');
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin('email', email, password);
  }

  return (
    <div id="app-container" className="bg-white dark:bg-gray-900 text-black dark:text-white rounded-lg">
      <div className="login-container">
        <form onSubmit={handleEmailLogin} className="login-form bg-white dark:bg-gray-800 p-6 rounded shadow-lg">
          <div className="input-container">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder=" "
              className="text-black dark:text-white dark:bg-gray-600 dark:border-none"
              disabled={loading}
            />
            <label>Email</label>
          </div>

          <div className="input-container">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=" "
              className="text-black dark:text-white dark:bg-gray-600 dark:border-none"
              disabled={loading}
            />
            <label>Password</label>
          </div>

          {errorMessage && (
            <div className="text-red-500">{errorMessage}</div>
          )}

          <a href="./forgot-password" className="block text-blue-500 dark:text-blue-400 underline pointer">
            <strong>Forgot password?</strong>
          </a>

          <button
            type="submit"
            className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded pointer mt-4 dark:bg-blue-600 dark:hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-4 flex gap-x-4">
          <button
            className="w-1/2 p-2 bg-red-500 hover:bg-red-600 text-white rounded pointer flex items-center justify-center dark:bg-red-700 dark:hover:bg-red-800"
            onClick={() => handleLogin('google')}
            disabled={loading}
          >
            <FaGoogle size={24} />
            <span className="ml-2">Google</span>
          </button>

          <button
            className="w-1/2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded pointer flex items-center justify-center dark:bg-blue-700 dark:hover:bg-blue-800"
            onClick={() => handleLogin('facebook')}
            disabled={loading}
          >
            <FaFacebook size={24} />
            <span className="ml-2">Facebook</span>
          </button>
        </div>

        <div className="mt-4 text-black dark:text-white">
          <p>Don't have an account?
            <a href="/signup" className="ml-2 text-blue-500 dark:text-blue-400 underline">
              <strong>Sign Up</strong>
            </a>
          </p>
        </div>
        <div>
          <p className='mt-10 text-xl'>No backend configuration</p>
          <button
            className='text-3xl underline'
            onClick={() => navigate('/dashboard')}
          >
            Click here to test the App
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
