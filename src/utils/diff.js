import { createTwoFilesPatch } from 'diff';
import { html } from 'diff2html';
import 'diff2html/bundles/css/diff2html.min.css';

// eslint-disable-next-line import/named
export const getDiff = (text1, text2) => {
  const patch = createTwoFilesPatch('Original', 'Modified', text1, text2);
  return html(patch, { inputFormat: 'diff', showFiles: false, matching: 'lines', outputFormat: 'side-by-side' });
};
