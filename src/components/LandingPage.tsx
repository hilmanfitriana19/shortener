import React from 'react';
import { Link as LinkIcon } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

export const LandingPage: React.FC = () => {
  const { signInWithGoogle } = useAuth();
  const { themeConfig } = useTheme();

  return (
    <div className={`min-h-screen ${themeConfig.gradient} flex items-center justify-center px-4 dark:text-gray-100`}>
      <div className="max-w-2xl text-center space-y-6">
        <div className={`inline-flex p-4 bg-gradient-to-r ${themeConfig.primary} rounded-2xl`}>
          <LinkIcon className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-100">LinkShort</h1>
        <p className="text-gray-300">
          Shorten your links with style and track their performance with beautiful analytics.
        </p>
        <p className="text-gray-400">
          Create custom aliases, organize your links and view click statistics. All in a modern and responsive interface.
        </p>
        <button
          onClick={signInWithGoogle}
          className={`mt-6 bg-gradient-to-r ${themeConfig.primary} hover:${themeConfig.secondary} text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl`}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

