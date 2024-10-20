import React, { useState } from 'react';
import { FolderIcon, FileIcon, ChevronDownIcon, ChevronRightIcon } from 'lucide-react';

const mockData = [
  { name: 'test1', latestDate: '2024.09.03', category: 'Project' },
  { name: 'test2', latestDate: '2024.09.05', category: 'Project' },
  { name: 'test3', latestDate: '2024.09.06', category: 'script' },
];

const FileExplorer = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'

  const handleItemClick = (index) => {
    setSelectedItem(index);
  };

  const getIcon = (category) => {
    return category.toLowerCase() === 'project' ? <FolderIcon size={20} className="text-gray-300" /> : <FileIcon size={20} className="text-gray-300" />;
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg shadow-md text-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">File Explorer</h2>
        <div>
          <button
            onClick={() => setViewMode('list')}
            className={`mr-2 p-2 rounded ${viewMode === 'list' ? 'bg-gray-700 text-white' : 'bg-gray-800 text-gray-400'}`}
          >
            <ChevronDownIcon size={20} />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-gray-700 text-white' : 'bg-gray-800 text-gray-400'}`}
          >
            <ChevronRightIcon size={20} />
          </button>
        </div>
      </div>
      <div className={`bg-black rounded-lg overflow-hidden ${viewMode === 'list' ? '' : 'grid grid-cols-3 gap-4'}`}>
        {viewMode === 'list' && (
          <div className="flex font-semibold border-b border-gray-700 p-2 text-gray-400">
            <div className="w-1/3">Name</div>
            <div className="w-1/3">Latest Date</div>
            <div className="w-1/3">Category</div>
          </div>
        )}
        {mockData.map((item, index) => (
          <div
            key={index}
            className={`${
              viewMode === 'list'
                ? 'flex items-center p-2 hover:bg-gray-800 cursor-pointer'
                : 'flex flex-col items-center p-4 hover:bg-gray-800 cursor-pointer'
            } ${selectedItem === index ? 'bg-gray-700' : ''}`}
            onClick={() => handleItemClick(index)}
          >
            {viewMode === 'list' ? (
              <>
                <div className="w-1/3 flex items-center">
                  {getIcon(item.category)}
                  <span className="ml-2">{item.name}</span>
                </div>
                <div className="w-1/3">{item.latestDate}</div>
                <div className="w-1/3">{item.category}</div>
              </>
            ) : (
              <>
                {getIcon(item.category)}
                <span className="mt-2">{item.name}</span>
                <span className="text-sm text-gray-400">{item.latestDate}</span>
                <span className="text-sm text-gray-400">{item.category}</span>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileExplorer;