import React from 'react';

const CourseCardSkeleton: React.FC<{ viewMode: 'grid' | 'list' }> = ({ viewMode }) => {
  const cardClasses = "glass-effect rounded-2xl overflow-hidden animate-pulse flex";
  const viewModeClasses = viewMode === 'grid' ? 'flex-col' : 'flex-col md:flex-row';

  return (
    <div className={`${cardClasses} ${viewModeClasses}`}>
      {/* Thumbnail Section */}
      <div className={`bg-gray-700/50 ${viewMode === 'grid' ? 'aspect-video' : 'md:w-1/3 aspect-video'}`}></div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <div className="h-4 bg-gray-700/50 rounded w-1/4"></div>
          <div className="h-4 bg-gray-700/50 rounded w-1/4"></div>
        </div>

        <div className="h-6 bg-gray-700/50 rounded w-3/4 mb-2"></div>

        <div className="flex items-center space-x-2 mb-3">
          <div className="w-6 h-6 bg-gray-700/50 rounded-full"></div>
          <div className="h-4 bg-gray-700/50 rounded w-1/3"></div>
        </div>

        {viewMode === 'list' && (
          <div className="space-y-2 mb-4">
              <div className="h-4 bg-gray-700/50 rounded"></div>
              <div className="h-4 bg-gray-700/50 rounded w-5/6"></div>
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-gray-300 mb-4">
          <div className="h-4 bg-gray-700/50 rounded w-1/4"></div>
          <div className="h-4 bg-gray-700/50 rounded w-1/4"></div>
          <div className="h-4 bg-gray-700/50 rounded w-1/4"></div>
        </div>

        <div className="flex flex-wrap gap-1 mb-4">
            <div className="h-5 bg-gray-700/50 rounded w-1/5"></div>
            <div className="h-5 bg-gray-700/50 rounded w-1/5"></div>
            <div className="h-5 bg-gray-700/50 rounded w-1/5"></div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
          <div className="h-8 bg-gray-700/50 rounded w-1/3"></div>
          <div className="h-10 bg-gray-700/50 rounded-lg w-1/4"></div>
        </div>
      </div>
    </div>
  );
};

export default CourseCardSkeleton;