import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, LogIn, Heart, Smartphone, Key } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LoginProps {
  userType: 'patient' | 'doctor';
}

const Login: React.FC<LoginProps> = ({ userType }) => {
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    otp: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.fullName) {
      setError('Please enter your full name');
      return;
    }

    if (loginMethod === 'email') {
      if (!formData.email || !formData.password) {
        setError('Please fill in all fields');
        return;
      }

      const success = login(
        formData.email,
        formData.password,
        userType,
        formData.fullName // ✅ Pass full name
      );

      if (success) {
        navigate(userType === 'patient' ? '/patient-dashboard' : '/doctor-dashboard');
      } else {
        setError('Invalid credentials. Please try again.');
      }
    } else {
      if (!formData.phone || !formData.otp) {
        setError('Please enter phone and OTP');
        return;
      }

      const success = login(
        formData.phone,
        formData.otp,
        userType,
        formData.fullName // ✅ Pass full name
      );

      if (success) {
        navigate(userType === 'patient' ? '/patient-dashboard' : '/doctor-dashboard');
      } else {
        setError('Invalid phone or OTP. Try again.');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Heart className="h-12 w-12 text-blue-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            {userType === 'patient' ? 'Patient Login' : 'Doctor Login'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {userType === 'patient'
              ? 'Access your health records and book appointments'
              : 'Access your patient management dashboard'}
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <button
            type="button"
            onClick={() => setLoginMethod('email')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              loginMethod === 'email' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Email Login
          </button>
          <button
            type="button"
            onClick={() => setLoginMethod('phone')}
            className={`px-4 py-2 rounded-lg text-sm font-medium ${
              loginMethod === 'phone' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
            }`}
          >
            Phone Login
          </button>
        </div>

        <form className="mt-6 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Full Name Field */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            {loginMethod === 'email' ? (
              <>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="block w-full px-3 py-3 pr-10 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                    <Smartphone className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                    OTP
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="otp"
                      name="otp"
                      type="text"
                      value={formData.otp}
                      onChange={handleInputChange}
                      required
                      className="block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter OTP"
                    />
                    <Key className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </>
            )}
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <LogIn className="h-5 w-5 mr-2" />
            Sign In
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              {userType === 'patient' ? 'Are you a doctor?' : 'Are you a patient?'}
              <Link
                to={userType === 'patient' ? '/doctor-login' : '/patient-login'}
                className="font-medium text-blue-600 hover:text-blue-500 ml-1"
              >
                {userType === 'patient' ? 'Doctor Login' : 'Patient Login'}
              </Link>
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Demo Credentials:</h4>
            <p className="text-xs text-gray-600">
              Full Name: John Doe<br />
              Email: demo@example.com<br />
              Password: any password<br />
              Phone: 9876543210<br />
              OTP: 123456
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
