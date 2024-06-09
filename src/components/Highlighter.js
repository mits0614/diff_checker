let highlightWords = [];

export function toggleHighlight() {
  const isHighlightOn = document.getElementById('highlightSwitch').checked;
  if (isHighlightOn) {
    fetch('highlight_words.json')
      .then(response => response.json())
      .then(data => {
        highlightWords = data.words;
        highlightText();
      })
      .catch(error => console.error('Error loading JSON:', error));
  } else {
    clearHighlights();
  }
}

function highlightText() {
  const textEdit = document.getElementById('editor1').env.document;
  let text = textEdit.getValue();
  highlightWords.forEach(word => {
    const regex = new RegExp(`(${word})`, 'gi');
    text = text.replace(regex, '<span class="highlight">$1</span>');
  });
  textEdit.setValue(text);
}

function clearHighlights() {
  const textEdit = document.getElementById('editor1').env.document;
  let text = textEdit.getValue();
  text = text.replace(/<span class="highlight">(.*?)<\/span>/g, '$1');
  textEdit.setValue(text);
}
