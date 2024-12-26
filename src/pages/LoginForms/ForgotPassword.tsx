import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../services/firebase";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setErrorMessage("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent. Please check your inbox.");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container bg-white dark:bg-gray-900 text-black dark:text-white rounded-lg">
      <form
        onSubmit={handlePasswordReset}
        className="login-form bg-white dark:bg-gray-800 p-6 rounded shadow-lg"
      >
        <div className="input-container">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
            className="text-black dark:text-white bg-white dark:bg-gray-600 dark:border-none"
            disabled={loading}
          />
          <label>Email</label>
        </div>

        {message && <div className="text-green-500">{message}</div>}
        {errorMessage && <div className="text-red-500">{errorMessage}</div>}

        <button
          type="submit"
          className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded pointer mt-2 dark:bg-blue-600 dark:hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Email"}
        </button>
      </form>

      <div className="mt-4 text-black dark:text-white">
        <p>
          Remembered your password?{" "}
          <a href="/" className="text-blue-500 dark:text-blue-400 underline">
            <strong>Login</strong>
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
