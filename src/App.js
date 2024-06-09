import React, { useState, useRef } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';
import './App.css';
import { readFile, saveFile } from './components/FileOperations';
import { showDiff, highlightDiff } from './components/DiffViewer';
import { toggleHighlight } from './components/Highlighter';
import { highlightFullWidthChars } from './components/FullWidthHighlighter';

function App() {
  const [code, setCode] = useState('');
  const [diffHtml, setDiffHtml] = useState('');
  const editor1Ref = useRef(null);
  const editor2Ref = useRef(null);

  const handleShowDiff = () => {
    if (editor1Ref.current && editor2Ref.current) {
      const editor1 = editor1Ref.current.editor;
      const editor2 = editor2Ref.current.editor;
      const text1 = editor1.getValue();
      const text2 = editor2.getValue();
      const diffResult = showDiff(text1, text2);
      setDiffHtml(diffResult);
      highlightDiff(diffResult);
    }
  };

  const handleHighlight = () => {
    highlightFullWidthChars();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Diffchecker for Windows</h1>
        <div className="buttons">
          <button onClick={readFile}>Open File</button>
          <button onClick={saveFile}>Save File</button>
          <button onClick={handleShowDiff}>Show Diff</button>
          <button onClick={toggleHighlight}>Toggle Highlight</button>
          <button onClick={handleHighlight}>Highlight Full Width Chars</button>
        </div>
        <div className="editor-container">
          <AceEditor
            ref={editor1Ref}
            mode="javascript"
            theme="github"
            name="editor1"
            onChange={setCode}
            value={code}
            editorProps={{ $blockScrolling: true }}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
            }}
          />
          <AceEditor
            ref={editor2Ref}
            mode="javascript"
            theme="github"
            name="editor2"
            onChange={setCode}
            value={code}
            editorProps={{ $blockScrolling: true }}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true,
            }}
          />
        </div>
        <div
          className="diff-output"
          dangerouslySetInnerHTML={{ __html: diffHtml }}
        />
      </header>
    </div>
  );
}

export default App;
