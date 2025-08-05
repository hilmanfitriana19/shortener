import React, { useState } from 'react';
import { ExternalLink, Copy, Edit3, Trash2, BarChart3, Eye, EyeOff } from 'lucide-react';
import { Link } from '../types';
import { useTheme } from '../hooks/useTheme';

interface LinkCardProps {
  link: Link;
  onEdit: (link: Link) => void;
  onDelete: (linkId: string) => void;
  onCopy: (shortUrl: string) => void;
}

export const LinkCard: React.FC<LinkCardProps> = ({ link, onEdit, onDelete, onCopy }) => {
  const [showFullUrl, setShowFullUrl] = useState(false);
  const { themeConfig } = useTheme();
  
  const shortUrl =
    link.shortUrl ||
    `${window.location.origin}${import.meta.env.BASE_URL.replace(/\/$/, '')}/${
      link.userId
    }/${link.customAlias || link.shortCode}`;
  const displayUrl = showFullUrl ? link.originalUrl : 
    link.originalUrl.length > 50 ? link.originalUrl.substring(0, 50) + '...' : link.originalUrl;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          {link.title && (
            <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-1">{link.title}</h3>
          )}
          {link.description && (
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{link.description}</p>
          )}
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Short URL:</span>
              <button
                onClick={() => onCopy(shortUrl)}
                className={`text-sm font-mono bg-gradient-to-r ${themeConfig.primary} text-white px-3 py-1 rounded-lg hover:shadow-md transition-all duration-200 flex items-center space-x-1`}
              >
                <span>{shortUrl}</span>
                <Copy className="w-3 h-3" />
              </button>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Original:</span>
              <div className="flex items-center space-x-1">
                <span className="text-sm text-gray-700 dark:text-gray-100 font-mono break-all">{displayUrl}</span>
                {link.originalUrl.length > 50 && (
                  <button
                    onClick={() => setShowFullUrl(!showFullUrl)}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    {showFullUrl ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 ml-4">
          <div className={`flex items-center space-x-1 bg-gradient-to-r ${themeConfig.primary} text-white px-3 py-1 rounded-lg`}>
            <BarChart3 className="w-3 h-3" />
            <span className="text-sm font-semibold">{link.clicks}</span>
          </div>
          
          <div className={`w-3 h-3 rounded-full ${link.isActive ? 'bg-green-400' : 'bg-red-400'}`} 
               title={link.isActive ? 'Active' : 'Inactive'} />
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          Created {formatDate(link.createdAt)}
        </div>
        
        <div className="flex items-center space-x-2">
          <a
            href={shortUrl}
            target={link.openInNewTab ? '_blank' : '_self'}
            rel="noopener noreferrer"
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            title="Open short link"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
          
          <button
            onClick={() => onEdit(link)}
            className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            title="Edit link"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => onDelete(link.id)}
            className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
            title="Delete link"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};