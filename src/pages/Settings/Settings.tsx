import React, { useState, ChangeEvent } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';

const Settings: React.FC = () => {
  const [username, setUsername] = useState<string>('João Fernandes');
  const [email, setEmail] = useState<string>('joao.fernandes@example.com');
  const [emailError, setEmailError] = useState<string | null>(null)
  const [password, setPassword] = useState<string>('');
  const [profilePic, setProfilePic] = useState<string | null>(null);

  const handleSave = (): void => {
    alert('Settings saved successfully!');
  };

  const handleProfilePicChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) setProfilePic(URL.createObjectURL(file));
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    setEmailError(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail) ? null : 'Invalid email format'
    )
  }

  return (
    <div className="flex lg:flex-row h-screen dark:bg-gray-800">
      <Sidebar />
      <div className="flex-1 flex items-center justify-center p-4 text-black dark:text-white relative z-40">
        <div className="p-6 lg:p-8 rounded-lg shadow-lg w-full max-w-sm md:max-w-md lg:max-w-lg dark:bg-gray-700">
          <h1 className="text-3xl font-bold mb-6 text-center">Settings</h1>

          <form>
            <div className="mb-6 text-center">
              <div className="relative w-32 h-32 mx-auto mb-2">
                <img
                  src={profilePic || 'https://via.placeholder.com/150'}
                  id='profile-pic'
                  alt="Profile"
                  className="w-full h-full rounded-full border border-gray-300 dark:border-gray-500 object-cover"
                />
                <label htmlFor='settings-img' className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer">
                  +
                </label>
                <input
                  type="file"
                  id='settings-img'
                  accept="image/*"
                  onChange={handleProfilePicChange}
                  className="hidden"
                />
              </div>
              <p className="text-sm dark:text-gray-300">
                Click to upload a new profile picture
              </p>
            </div>

            <div className="mb-6">
              <label htmlFor='settings-username' className="block mb-2 font-semibold">
                Username
              </label>
              <input
                type="text"
                id='settings-username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-600 dark:text-white dark:focus:ring-gray-400"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="settings-email" className="block mb-2 font-semibold">
                Email
              </label>
              <input
                type="email"
                id="settings-email"
                value={email}
                onChange={handleEmailChange}
                className={`w-full border ${emailError
                    ? 'border-red-500 focus:ring-red-400'
                    : 'border-gray-300 dark:border-gray-600'
                  } rounded-lg p-3 dark:bg-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-gray-400`}
                placeholder="Enter your email"
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor='settings-password' className="block mb-2 font-semibold">
                Password
              </label>
              <input
                type="password"
                id='settings-password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-600 dark:text-white dark:focus:ring-gray-400"
                placeholder="Enter new password"
              />
            </div>

            <button
              type="button"
              onClick={handleSave}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 dark:focus:ring-gray-400"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
