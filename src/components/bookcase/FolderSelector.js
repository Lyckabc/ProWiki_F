import React from 'react';
import { useQuery } from '@tanstack/react-query';
import API from '../../services/api';

function FolderSelector() {
  const { data: folderStructure, isLoading, error } = useQuery({
    queryKey: ['folderStructure'],
    queryFn: API.getFolderStructure
  });

  const handleFolderSelect = () => {
    if (folderStructure) {
      console.log('Folder structure:', folderStructure);
      // 여기서 선택된 폴더 구조를 사용할 수 있습니다.
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <button 
      onClick={handleFolderSelect}
      style={{
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        backgroundColor: 'orange',
        border: 'none',
        cursor: 'pointer'
      }}
    />
  );
}

export default FolderSelector;