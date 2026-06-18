import { ChangeEvent, useState, SubmitEvent } from 'react';
import { loginUser } from '../data-access/auth';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from './auth-provider';

export default function AuthForm({ onSuccessClose }: { onSuccessClose: () => void }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: 'emilys',
    password: 'emilyspass',
    confirmPassword: '',
  });
  const { loginData, login } = useAuth();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isLogin) {
      mutate({ username: formData.username, password: formData.password });
    } else {
      console.log('Registering with:', formData);
    }
  };

  const { mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      login(data);
      onSuccessClose();
    },
  });
  if (loginData) return null;
  return (
    <div className=" flex items-center justify-center p-4 font-sans">
      {/* Form Container Card */}
      <div className="w-full max-w-md bg-white p-8 rounded-2xl border border-gray-100 shadow-md">
        {/* Header Block */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            {isLogin
              ? 'Please sign in to access your dashboard'
              : 'Fill in the fields below to get started'}
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1.5"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              required
              value={formData.username}
              onChange={handleChange}
              placeholder="user name"
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm transition-all text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* Password Input */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              {isLogin && (
                <a
                  href="#forgot"
                  className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  Forgot password?
                </a>
              )}
            </div>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm transition-all text-gray-900 placeholder-gray-400"
            />
          </div>

          {/* Confirm Password (Conditionally rendered for Registration) */}
          {!isLogin && (
            <div className="animate-fade-in">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required={!isLogin}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 text-sm transition-all text-gray-900 placeholder-gray-400"
              />
            </div>
          )}

          {/* Primary Action Button */}
          <button
            type="submit"
            className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold text-sm py-3 px-5 mt-2 rounded-xl shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        {/* Footer Toggle Link */}
        <div className="mt-6 pt-5 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600">
            {isLogin
              ? "Don't have an account yet?"
              : 'Already have an account?'}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              type="button"
              className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors cursor-pointer focus:outline-none underline decoration-2 decoration-transparent hover:decoration-indigo-600"
            >
              {isLogin ? 'Register here' : 'Sign in here'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
