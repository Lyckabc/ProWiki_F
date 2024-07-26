import React from 'react';

function GridView() {
  // 여기에 실제 데이터를 사용하여 그리드 아이템을 렌더링합니다
  return (
    <div className="grid-view">
      <div className="grid-item">
        <h3>Project Sample</h3>
        <p>Lorem ipsum dolor sit amet...</p>
      </div>
      {/* 더 많은 그리드 아이템을 추가할 수 있습니다 */}
    </div>
  );
}

export default GridView;