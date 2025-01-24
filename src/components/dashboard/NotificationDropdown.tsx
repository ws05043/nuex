'use client'

import { useEffect, useRef } from 'react';

interface Props {
  onClose: () => void;
}

const NotificationDropdown = ({ onClose }: Props) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  return (
    <div ref={dropdownRef} className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
      <div className="px-4 py-2 border-b border-gray-100">
        <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {/* Notification Items */}
        <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
          <div className="text-sm text-gray-900">New project assigned</div>
          <div className="text-xs text-gray-500">2 hours ago</div>
        </div>
        
        <div className="px-4 py-3 hover:bg-gray-50 cursor-pointer">
          <div className="text-sm text-gray-900">Meeting scheduled</div>
          <div className="text-xs text-gray-500">3 hours ago</div>
        </div>
      </div>

      <div className="px-4 py-2 border-t border-gray-100">
        <button className="text-sm text-blue-600 hover:text-blue-700">
          View all notifications
        </button>
      </div>
    </div>
  );
};

export default NotificationDropdown; 