import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert('Sign up successful!');
        } catch (error: unknown) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container bg-white dark:bg-gray-900 text-black dark:text-white rounded-lg">
            <form onSubmit={handleSignUp} className="login-form bg-white dark:bg-gray-800 p-6 rounded shadow-lg">
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

                <div className="input-container">
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder=" "
                        className="text-black dark:text-white dark:bg-gray-600 dark:border-none"
                        disabled={loading}
                    />
                    <label>Confirm Password</label>
                </div>

                {errorMessage && (
                    <div className="text-red-500">{errorMessage}</div>
                )}

                <button
                    type="submit"
                    className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded pointer mt-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                    disabled={loading}
                >
                    {loading ? 'Signing up...' : 'Sign Up'}
                </button>
            </form>

            <div className="mt-4 text-black dark:text-white">
                <p>
                    Already have an account? {' '}
                    <a href="/" className="text-blue-500 dark:text-blue-400 underline">
                        <strong>Login</strong>
                    </a>
                </p>
            </div>
        </div>
    )
}

export default SignUp;