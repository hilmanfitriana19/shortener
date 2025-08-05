import React from 'react';
import { Link as LinkIcon, LogOut, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { themeConfig } = useTheme();

  return (
    <header className={`bg-gradient-to-r ${themeConfig.primary} shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 dark:bg-gray-800/40 rounded-lg backdrop-blur-sm">
              <LinkIcon className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">LinkShort</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {user && (
              <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg px-3 py-2">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt={user.displayName || 'User'} 
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <User className="w-5 h-5 text-white" />
                  )}
                  <span className="text-white text-sm font-medium">
                    {user.displayName || user.email}
                  </span>
                </div>
                
                <button
                  onClick={logout}
                  className="p-2 bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm hover:bg-white/20 dark:hover:bg-gray-700/70 rounded-lg transition-all duration-200"
                  title="Sign Out"
                >
                  <LogOut className="w-5 h-5 text-white" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};