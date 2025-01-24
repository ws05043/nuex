'use client'

import { useState } from 'react';
import packageJson from '../../../package.json';

const VersionTooltip = () => {
  const [isVisible, setIsVisible] = useState(false);
  const version = packageJson.version;

  return (
    <div className="relative">
      <span 
        className="px-2.5 py-0.5 text-[10px] text-blue-600 bg-blue-50/50 border border-blue-100/50 rounded-full font-medium shadow-sm backdrop-blur-sm cursor-help"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        v{version}
      </span>

      {isVisible && (
        <div className="absolute left-0 top-full mt-2 w-40 p-2 bg-white/60 backdrop-blur-md text-gray-600 text-[11px] rounded-lg shadow-sm border border-gray-100/50 z-50">
          <div className="font-medium mb-1 text-gray-700">Current Updates:</div>
          <ul className="space-y-0.5">
            <li>• Added version indicator</li>
            <li>• Cleaned up dashboard UI</li>
            <li>• Better notification system</li>
          </ul>
          <div className="absolute left-4 -top-1 w-2 h-2 bg-white/60 rotate-45 border-l border-t border-gray-100/50"></div>
        </div>
      )}
    </div>
  );
};

export default VersionTooltip; 