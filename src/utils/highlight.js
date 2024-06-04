export const highlightWords = (text, words) => {
  const regex = new RegExp(`(${words.join('|')})`, 'gi');
  return text.replace(regex, (match) => `<span class="highlight">${match}</span>`);
};

export const removeHighlight = (text) => {
  return text.replace(/<span class="highlight">(.*?)<\/span>/gi, '$1');
};
