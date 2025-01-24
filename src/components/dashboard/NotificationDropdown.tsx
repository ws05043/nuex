'use client';
import { useState, useRef, useEffect } from 'react';

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const notifications = [
    {
      id: 1,
      type: 'mention',
      message: 'Sarah Chen mentioned you in Floor Plan Review',
      time: '2 min ago',
      unread: true,
      project: 'Modern Loft Renovation'
    },
    {
      id: 2,
      type: 'update',
      message: 'New files uploaded to Kitchen Layout',
      time: '1 hour ago',
      unread: true,
      project: 'Minimalist Studio Design'
    },
    {
      id: 3,
      type: 'deadline',
      message: 'Project deadline approaching',
      time: '3 hours ago',
      unread: false,
      project: 'Modern Loft Renovation'
    },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Bell */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl hover:bg-gray-50"
      >
        <svg 
          className="w-6 h-6 text-gray-600" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
          />
        </svg>
        {hasUnread && (
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-blue-500 rounded-full" />
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-lg border border-gray-100 py-2 z-50">
          <div className="px-4 py-2 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h3 className="font-medium text-gray-900">Notifications</h3>
              <button 
                onClick={() => setHasUnread(false)}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Mark all as read
              </button>
            </div>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div 
                key={notification.id}
                className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                  notification.unread ? 'bg-blue-50/50' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`mt-1 w-2 h-2 rounded-full ${
                    notification.unread ? 'bg-blue-500' : 'bg-gray-300'
                  }`} />
                  <div>
                    <p className="text-sm text-gray-900">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {notification.project} • {notification.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="px-4 py-2 border-t border-gray-100">
            <button className="text-sm text-gray-500 hover:text-gray-700 w-full text-center">
              View all notifications
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown; 