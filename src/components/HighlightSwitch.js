import React from 'react';
import './HighlightSwitch.css';

function HighlightSwitch({ isOn, onToggle }) {
  return (
    <div className="label">
      <label>
        Highlight
        <input className="switch" type="checkbox" checked={isOn} onChange={onToggle} />
      </label>
    </div>
  );
}

export default HighlightSwitch;
