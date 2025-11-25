import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className="flex items-center gap-3">
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent"></div>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-3/5 h-3/5 text-white relative z-10"
        >
          <path
            d="M3 8L12 3L21 8V16L12 21L3 16V8Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M12 3V21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M3 8L21 16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M21 8L3 16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      {showText && (
        <span className={`${textSizeClasses[size]} font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent`}>
          ZEABIS
        </span>
      )}
    </div>
  );
};
