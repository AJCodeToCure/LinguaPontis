import React, { useState } from 'react';
import bgImage from '../../assets/images/login_bg.png'; // Adjust the path based on your folder structure
import EmailIcon from '../../assets/EmailIcon';
import KeyIcon from "../../assets/KeyIcon";
import EyeIcon from "../../assets/EyeIcon";  // Assuming you have an EyeIcon in your assets

const Login = () => {
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }} // Use background image from assets
    >
      <div className="flex items-center justify-center h-screen">
        <div className="w-full max-w-md p-8 ">
          
          {/* Welcome and LinguaPontis text */}
          <h2 className="text-3xl font-bold text-left text-gray-800 mb-1">Welcome to</h2>
          <h2 className="text-[46px] font-serif font-semibold text-[var(--darkBlue)] mb-10">LinguaPontis</h2>

          <form className="space-y-6">
            {/* Email Field */}
            <div className="relative">
              <label htmlFor="email" className="sr-only">Email</label>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <EmailIcon />
              </div>
              <input 
                type="email" 
                name="email" 
                id="email" 
                placeholder="Email" 
                className="w-full pl-10 pr-2 py-2 border border-gray-300 rounded-[20px] focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Password Field */}
            <div className="relative">
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <KeyIcon />
              </div>
              <input 
                type={showPassword ? "text" : "password"} // Toggle between text and password
                name="password" 
                id="password" 
                placeholder="Password" 
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-[20px] focus:ring-blue-500 focus:border-blue-500"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                <EyeIcon />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 text-sm text-gray-900">Remember me</label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-[var(--darkBlue)] hover:text-blue-500">Forgot your password?</a>
              </div>
            </div>

            {/* Login Button */}
            <div>
              <button 
                type="submit" 
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-[20px] text-white bg-[var(--darkBlue)] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Log in
              </button>
                {/* Register Link */}
            <div className="text-sm text-center mt-2 text-gray-600">
              Don’t have an account? <a href="#" className="text-blue-600 font-medium hover:text-blue-500">Register</a>
            </div>
            </div>

          
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
