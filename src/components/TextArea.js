import React from 'react';

function TextArea({ value, onChange, placeholder }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{ width: '100%', height: '300px' }}
    />
  );
}

export default TextArea;
