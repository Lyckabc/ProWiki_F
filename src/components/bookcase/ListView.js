import React from 'react';

const sampleData = [
  { id: 1, name: "MainCategory", latestDate: "2024-03-15", category: "Folder" },
  { id: 2, name: "SubCategory1", latestDate: "2024-03-14", category: "Folder" },
  { id: 3, name: "SubCategory2", latestDate: "2024-03-13", category: "Folder" },
  { id: 4, name: "Document1.pdf", latestDate: "2024-03-12", category: "PDF" },
  { id: 5, name: "Spreadsheet.xlsx", latestDate: "2024-03-11", category: "Excel" },
  { id: 6, name: "Presentation.pptx", latestDate: "2024-03-10", category: "PowerPoint" },
];


function ListView() {
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
          {sampleData.map((item) => (
            <tr key={item.id}>
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