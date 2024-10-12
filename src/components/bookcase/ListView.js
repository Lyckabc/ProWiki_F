import React from 'react';

function ListView({ data, onItemSelect }) {
  return (
    <div className="list-view">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Latest Date</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {data && data.map((item) => (
            <tr key={item.id} onClick={() => onItemSelect(item)}>
              <td>{item.name}</td>
              <td>{item.latestDate}</td>
              <td>{item.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListView;