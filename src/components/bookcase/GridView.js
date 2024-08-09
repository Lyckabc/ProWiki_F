import React from 'react';

const sampleData = [
  { id: 1, name: "MainCategory", type: "folder" },
  { id: 2, name: "SubCategory1", type: "folder" },
  { id: 3, name: "SubCategory2", type: "folder" },
  { id: 4, name: "Document1.pdf", type: "pdf" },
  { id: 5, name: "Spreadsheet.xlsx", type: "excel" },
  { id: 6, name: "Presentation.pptx", type: "powerpoint" },
];

function GridView() {
  const getIcon = (type) => {
    switch (type) {
      case 'folder':
        return '📁';
      case 'pdf':
        return '📄';
      case 'excel':
        return '📊';
      case 'powerpoint':
        return '📽️';
      default:
        return '📄';
    }
  };

  return (
    <div className="grid-view">
      {sampleData.map((item) => (
        <div key={item.id} className="grid-item">
          <div className="icon">{getIcon(item.type)}</div>
          <div className="name">{item.name}</div>
        </div>
      ))}
    </div>
  );
}


export default GridView;