import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col-reverse md:flex-row min-h-screen overflow-y-auto">
      {/* Left side with image (on mobile, this is below) */}
      <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center p-0 md:p-0 md:flex-none md:h-auto md:min-h-0">
        <img
          src="/landing-illustration.jpg"
          alt="Landing Illustration"
          className="w-full object-contain md:h-full md:max-h-[80vh] md:object-contain"
        />
      </div>
      {/* Right side with content (on mobile, this is on top) */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-white py-8 px-4 md:py-0 md:px-0">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-4 text-center">Welcome to ConTrad</h1>
        <p className="text-base md:text-lg text-gray-600 mb-8 text-center max-w-md">
          ConTrad is your B2B marketplace for discovering, managing, and connecting with companies and products. Sign up or sign in to get started!
        </p>
        <div className="flex flex-col md:flex-row gap-4 w-full max-w-xs md:max-w-none md:space-x-4 md:gap-0">
          <button
            className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
            onClick={() => navigate('/signup')}
          >
            Sign Up
          </button>
          <button
            className="w-full md:w-auto px-8 py-3 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition"
            onClick={() => navigate('/signin')}
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing; 