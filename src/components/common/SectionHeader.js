import React from 'react';

const SectionHeader = ({
  badge,
  title,
  highlight,
  description,
  className = '',
  titleClassName = '',
  highlightClassName = 'text-blue-600',
  descriptionClassName = 'text-lg text-gray-600',
  badgeVariant = 'default' // 'default' or 'light'
}) => {
  return (
    <div className={`text-center max-w-3xl mx-auto mb-12 ${className}`}>
      {badge && (
        <div className="inline-flex items-center justify-center px-6 py-2 rounded-full bg-blue-50 border border-blue-100 mb-4">
          <span className="flex h-2 w-2 mr-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          <span className="text-sm font-medium text-blue-800">{badge}</span>
        </div>
      )}
      <h2 className={`text-4xl font-bold text-gray-900 mb-4 ${titleClassName}`}>
        {title} {highlight && (
          <span className={`${highlightClassName}`}>
            {highlight}
          </span>
        )}
      </h2>
      <div className="w-20 h-1 bg-blue-500 mx-auto mb-6 rounded-full"></div>
      {description && (
        <p className={`${descriptionClassName}`}>
          {description}
        </p>
      )}
    </div>
  );
};

export default SectionHeader;
