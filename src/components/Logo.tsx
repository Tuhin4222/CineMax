import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer ring */}
      <circle
        cx="20"
        cy="20"
        r="18"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      
      {/* Film reel holes */}
      <circle cx="20" cy="8" r="2" fill="currentColor" />
      <circle cx="32" cy="20" r="2" fill="currentColor" />
      <circle cx="20" cy="32" r="2" fill="currentColor" />
      <circle cx="8" cy="20" r="2" fill="currentColor" />
      
      {/* Center play button */}
      <circle
        cx="20"
        cy="20"
        r="8"
        fill="currentColor"
        opacity="0.9"
      />
      
      {/* Play triangle */}
      <path
        d="M17 15 L17 25 L25 20 Z"
        fill="white"
      />
      
      {/* Film strip lines */}
      <path
        d="M6 16 L34 16"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.6"
      />
      <path
        d="M6 24 L34 24"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.6"
      />
    </svg>
  );
};

export default Logo;