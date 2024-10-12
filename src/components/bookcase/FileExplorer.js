import React, { useState } from 'react';
import GridView from './GridView';
import ListView from './ListView';
import PageView from './PageView';

const sampleData = [
  { id: 1, name: "MainCategory", type: "folder", latestDate: "2024-03-15", category: "Folder", title: "MainCategory", content: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." },
  { id: 2, name: "SubCategory1", type: "folder", latestDate: "2024-03-14", category: "Folder" },
  { id: 3, name: "SubCategory2", type: "folder", latestDate: "2024-03-13", category: "Folder" },
  { id: 4, name: "Document1.pdf", type: "pdf", latestDate: "2024-03-12", category: "PDF" },
  { id: 5, name: "Spreadsheet.xlsx", type: "excel", latestDate: "2024-03-11", category: "Excel" },
  { id: 6, name: "Presentation.pptx", type: "powerpoint", latestDate: "2024-03-10", category: "PowerPoint" },
];

function FileExplorer() {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemSelect = (item) => {
    setSelectedItem(item);
  };

  return (
    <div className="file-explorer">
      <div className="view-toggle">
        <button onClick={() => setViewMode('grid')}>Grid View</button>
        <button onClick={() => setViewMode('list')}>List View</button>
      </div>
      <div className="content-area">
        <div className="file-list">
          {viewMode === 'grid' ? (
            <GridView data={sampleData} onItemSelect={handleItemSelect} />
          ) : (
            <ListView data={sampleData} onItemSelect={handleItemSelect} />
          )}
        </div>
        <div className="page-view-container">
          <PageView selectedItem={selectedItem} />
        </div>
      </div>
    </div>
  );
}

export default FileExplorer;