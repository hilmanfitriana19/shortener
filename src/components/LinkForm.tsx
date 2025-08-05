import React, { useState } from 'react';
import { Plus, Globe, Type, FileText } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { useLinks } from '../hooks/useLinks';

export const LinkForm: React.FC = () => {
  const { user } = useAuth();
  const { createLink } = useLinks(user?.uid || null);
  const [originalUrl, setOriginalUrl] = useState('');
  const [customAlias, setCustomAlias] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [openInNewTab, setOpenInNewTab] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { themeConfig } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!originalUrl.trim() || !user) return;

    setLoading(true);
    try {
      await createLink({
        originalUrl: originalUrl.trim(),
        customAlias: customAlias.trim() || undefined,
        title: title.trim() || undefined,
        description: description.trim() || undefined,
        openInNewTab,
        userId: user.uid,
        isActive: true,
      });

      // Reset form
      setOriginalUrl('');
      setCustomAlias('');
      setTitle('');
      setDescription('');
      setOpenInNewTab(true);
      setError('');
    } catch (error) {
      console.error('Error creating link:', error);
      if (error instanceof Error && error.message.includes('Custom alias')) {
        alert('This alias is already in use. Please choose another.');
        setError('This alias is already in use. Please choose another.');
      } else {
        setError('Failed to create link.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20 dark:border-gray-700">
      <div className="flex items-center space-x-3 mb-6">
        <div className={`p-2 bg-gradient-to-r ${themeConfig.primary} rounded-lg`}>
          <Plus className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Create Short Link</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Globe className="w-4 h-4" />
            <span>Original URL *</span>
          </label>
          <input
            type="url"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            placeholder="https://example.com/very-long-url"
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-900 dark:text-gray-100"
            required
          />
        </div>

        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Type className="w-4 h-4" />
            <span>Custom Alias (Optional)</span>
          </label>
          <input
            type="text"
            value={customAlias}
            onChange={(e) => {
              setCustomAlias(e.target.value.replace(/[^a-zA-Z0-9-_]/g, ''));
              setError('');
            }}
            placeholder="my-custom-link"
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-900 dark:text-gray-100"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Only letters, numbers, hyphens, and underscores allowed</p>
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>

        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <FileText className="w-4 h-4" />
            <span>Title (Optional)</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="My Awesome Link"
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-900 dark:text-gray-100"
          />
        </div>

        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <FileText className="w-4 h-4" />
            <span>Description (Optional)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of your link"
            rows={3}
            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none bg-white dark:bg-gray-900 dark:text-gray-100"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !originalUrl.trim()}
          className={`w-full bg-gradient-to-r ${themeConfig.primary} hover:${themeConfig.secondary} disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl`}
        >
          {loading ? 'Creating...' : 'Create Short Link'}
        </button>
      </form>
    </div>
  );
};