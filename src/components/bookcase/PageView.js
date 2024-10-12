import React from 'react';

const PageView = ({ selectedItem }) => {
  if (!selectedItem) {
    return <div className="page-view">Please select an item to view details.</div>;
  }

  return (
    <div className="page-view">
      <div className="page-header">
        <h2>{selectedItem.name}</h2>
      </div>
      <div className="page-content">
        <h3>{selectedItem.title || selectedItem.name}</h3>
        <p>{selectedItem.content || 'No content available.'}</p>
      </div>
    </div>
  );
};

export default PageView;