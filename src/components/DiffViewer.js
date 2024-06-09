import { html } from 'diff2html';
import 'diff2html/bundles/css/diff2html.min.css';
import { createPatch } from 'diff';

export function showDiff(text1, text2) {
  const diff = createPatch('diff', text1, text2);
  return html(diff, {
    inputFormat: 'diff',
    showFiles: true,
    matching: 'lines',
    outputFormat: 'side-by-side'
  });
}

export function highlightDiff(diffHtml) {
  const diffContainer = document.querySelector('.diff-output');
  if (diffContainer) {
    diffContainer.innerHTML = diffHtml;
    diffContainer.innerHTML = diffHtml.split('\n').map(line => {
      if (line.startsWith('+')) {
        return `<span style="background-color: #d4fcbc;">${line}</span>`;
      } else if (line.startsWith('-')) {
        return `<span style="background-color: #fbb6c2;">${line}</span>`;
      }
      return line;
    }).join('\n');
  }
}
