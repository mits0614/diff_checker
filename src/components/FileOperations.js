import React from 'react';
import './FileOperations.css';

function FileOperations({ onOpenFile }) {
  const handleFileRead = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      onOpenFile(e.target.result);
    };
    reader.readAsText(file);
  };

  return (
    <div>
      <button className="button">
        <label>
          Open File
          <input type="file" accept=".inp" style={{ display: 'none' }} onChange={handleFileRead} />
        </label>
      </button>
    </div>
  );
}

export default FileOperations;
