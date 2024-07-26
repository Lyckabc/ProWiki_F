import React from 'react';

function ListView() {
  // 여기에 실제 데이터를 사용하여 리스트 아이템을 렌더링합니다
  return (
    <div className="list-view">
      <div className="list-item">
        <h3>Name of Title</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
      </div>
      {/* 더 많은 리스트 아이템을 추가할 수 있습니다 */}
    </div>
  );
}

export default ListView;