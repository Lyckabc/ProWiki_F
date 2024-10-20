import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';

const PageView = () => {
  const [content, setContent] = useState("# Welcome to My Markdown Page\n\nThis is a sample content. You can edit this!");
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="page-view">
      <h1>Markdown Page</h1>
      <button onClick={toggleEditMode}>
        {isEditing ? "Switch to Preview" : "Switch to Edit"}
      </button>
      {isEditing ? (
        <MDEditor
          value={content}
          onChange={setContent}
          height={400}
          preview='edit'
        />
      ) : (
        <div className="preview-section">
          <MDEditor.Markdown source={content} />
        </div>
      )}
    </div>
  );
};

export default PageView;