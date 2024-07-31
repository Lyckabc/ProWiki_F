import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import API from '../services/api';

function FolderStructure() {
  const [currentPath, setCurrentPath] = useState('./Project_2023');
  const { data: folderStructure, isLoading, error } = useQuery({
    queryKey: ['folderStructure'],
    queryFn: API.getFolderStructure
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const title = folderStructure[0].split('/').pop();
  const subFolders = folderStructure
    .filter(path => path.startsWith(currentPath) && path !== currentPath)
    .map(path => path.replace(currentPath + '/', '').split('/')[0])
    .filter((value, index, self) => self.indexOf(value) === index);

  const handleDoubleClick = (folder) => {
    setCurrentPath(`${currentPath}/${folder}`);
  };

  return (
    <div className="folder-structure">
      <div className="book-title">
        <div className="book-cover">
          <h2>{title}</h2>
        </div>
      </div>
      <ul className="folder-list">
        {subFolders.map((folder, index) => (
          <li key={index} onDoubleClick={() => handleDoubleClick(folder)}>
            {folder}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FolderStructure;