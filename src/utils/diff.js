import { createPatch } from 'diff';
import { html } from 'diff2html';

export const getDiff = (originalText, newText) => {
  const diff = createPatch('diff', originalText, newText);
  const diffHtml = html(diff, { drawFileList: false, matching: 'lines' });
  return diffHtml;
};
