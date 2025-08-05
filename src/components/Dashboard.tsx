import React, { useState } from 'react';
import { Search, Filter, TrendingUp, Link as LinkIcon, MousePointer, Calendar } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useLinks } from '../hooks/useLinks';
import { useTheme } from '../hooks/useTheme';
import { LinkForm } from './LinkForm';
import { LinkCard } from './LinkCard';
import { Link } from '../types';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { links, loading, updateLink, deleteLink } = useLinks(user?.uid || null);
  const { themeConfig } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');


  const handleCopyLink = (shortUrl: string) => {
    navigator.clipboard.writeText(shortUrl);
    // You could add a toast notification here
  };

  const handleEditLink = (link: Link) => {
    // For now, we'll just toggle the active status
    updateLink(link.id, { isActive: !link.isActive });
  };

  const filteredLinks = links.filter(link => {
    const matchesSearch = !searchTerm || 
      link.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.customAlias?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || 
      (filter === 'active' && link.isActive) ||
      (filter === 'inactive' && !link.isActive);
    
    return matchesSearch && matchesFilter;
  });

  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);
  const activeLinks = links.filter(link => link.isActive).length;

  if (loading) {
    return (
      <div className={`min-h-screen ${themeConfig.gradient} flex items-center justify-center dark:text-gray-100`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Loading your links...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${themeConfig.gradient} dark:text-gray-100`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Total Links</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{links.length}</p>
              </div>
              <LinkIcon className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Total Clicks</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{totalClicks}</p>
              </div>
              <MousePointer className="w-8 h-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">Active Links</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{activeLinks}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">This Month</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-gray-100">{links.filter(link => {
                  const now = new Date();
                  const linkDate = new Date(link.createdAt);
                  return linkDate.getMonth() === now.getMonth() && linkDate.getFullYear() === now.getFullYear();
                }).length}</p>
              </div>
              <Calendar className="w-8 h-8 text-orange-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Link Creation Form */}
          <div className="lg:col-span-1">
            <LinkForm />
          </div>

          {/* Links List */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Your Links</h2>
                
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search links..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-white dark:bg-gray-900 dark:text-gray-100"
                    />
                  </div>
                  
                  <div className="relative">
                    <Filter className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <select
                      value={filter}
                      onChange={(e) => setFilter(e.target.value as 'all' | 'active' | 'inactive')}
                      className="pl-10 pr-8 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm appearance-none bg-white dark:bg-gray-900 dark:text-gray-100"
                    >
                      <option value="all">All Links</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredLinks.length === 0 ? (
                  <div className="text-center py-8">
                    <LinkIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">
                      {links.length === 0 ? 'No links created yet' : 'No links match your search'}
                    </p>
                  </div>
                ) : (
                  filteredLinks.map((link) => (
                    <LinkCard
                      key={link.id}
                      link={link}
                      onEdit={handleEditLink}
                      onDelete={deleteLink}
                      onCopy={handleCopyLink}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};