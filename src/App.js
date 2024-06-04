import React, { useState, useEffect } from 'react';
import HighlightSwitch from './components/HighlightSwitch';
import phitsDocument from './phits_document.json';
import phitsDocument2 from './phits_document2.json';
import sourceDocument from './source_document.json';
import sourceTypes from './sourceTypes.json';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-text';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-tomorrow';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-searchbox';
import './App.css';
import { highlightWords, removeHighlight } from './utils/highlight';
import { getDiff } from './utils/diff';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [text, setText] = useState('');
  const [diffText, setDiffText] = useState('');
  const [highlight, setHighlight] = useState(false);
  const [highlightWordsList, setHighlightWordsList] = useState([]);
  const [theme, setTheme] = useState('github');
  const [recentFiles, setRecentFiles] = useLocalStorage('recentFiles', []);
  const [error, setError] = useState(null);

  useEffect(() => {
    const keywords = [
      ...phitsDocument.patterns.map(item => item.pattern),
      ...phitsDocument2.keywords.map(item => item.keyword),
      ...sourceDocument.sources.map(item => item.source),
      ...sourceTypes.sourceTypes.map(item => item["s-type"].toString())
    ];
    setHighlightWordsList(keywords);
  }, []);

  const handleOpenFile = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setText(e.target.result);
        setRecentFiles([...recentFiles, file.name]);
        setError(null);
      };
      reader.onerror = () => {
        setError("Failed to read file");
      };
      reader.readAsText(file);
    } else {
      setError("No file selected");
    }
  };

  const handleSaveFile = () => {
    const file = new Blob([text], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = 'output.inp';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleShowDiff = async () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.inp';
    fileInput.onchange = async (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const correctContent = e.target.result;
          const diffHtml = getDiff(text, correctContent);
          setDiffText(diffHtml);
          setError(null);
        };
        reader.onerror = () => {
          setError("Failed to read file");
        };
        reader.readAsText(file);
      } else {
        setError("No file selected");
      }
    };
    fileInput.click();
  };

  const handleToggleHighlight = () => {
    setHighlight(!highlight);
    if (!highlight) {
      const highlightedText = highlightWords(text, highlightWordsList);
      setText(highlightedText);
    } else {
      const plainText = removeHighlight(text);
      setText(plainText);
    }
  };

  const handleTextChange = (newValue) => {
    setText(newValue);
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const handleClearHistory = () => {
    setRecentFiles([]);
  };

  return (
    <div className="App">
      <header>
        <h1>Diffchecker for Windows</h1>
      </header>
      <div className="toolbar">
        <button>
          <label>
            Open File
            <input type="file" accept=".inp" style={{ display: 'none' }} onChange={handleOpenFile} />
          </label>
        </button>
        <button onClick={handleSaveFile}>Save File</button>
        <button onClick={handleShowDiff}>Show Diff</button>
        <HighlightSwitch isOn={highlight} onToggle={handleToggleHighlight} />
        <select onChange={handleThemeChange} value={theme}>
          <option value="github">Light Theme</option>
          <option value="tomorrow">Dark Theme</option>
        </select>
        <button onClick={handleClearHistory}>Clear History</button>
      </div>
      {error && <div className="error">{error}</div>}
      <div className="recent-files">
        <h3>Recent Files</h3>
        <ul>
          {recentFiles.map((file, index) => (
            <li key={index}>{file}</li>
          ))}
        </ul>
      </div>
      <div className="textarea-container">
        <AceEditor
          mode="text"
          theme={theme}
          onChange={handleTextChange}
          value={text}
          name="editor"
          editorProps={{ $blockScrolling: true }}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
          }}
          style={{ width: '100%', height: '300px' }}
        />
      </div>
      <div className="textarea-container" dangerouslySetInnerHTML={{ __html: diffText }} />
    </div>
  );
}

export default App;
