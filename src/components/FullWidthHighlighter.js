export function highlightFullWidthChars() {
  const textEdit = document.getElementById('editor1').env.document;
  if (textEdit) {
    let text = textEdit.getValue();
    const regex = /[^\u0000-\u007F]/g;
    text = text.replace(regex, '<span class="highlight-fullwidth">$&</span>');
    textEdit.setValue(text);
  }
}
