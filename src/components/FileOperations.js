export function readFile() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.inp';

  input.onchange = e => {
    const file = e.target.files[0];
    if (!file) {
      alert('ファイルが選択されませんでした');
      return;
    }

    const reader = new FileReader();
    reader.onload = event => {
      document.getElementById('editor1').env.document.setValue(event.target.result);
    };
    reader.onerror = () => {
      alert('ファイルの読み込みに失敗しました');
    };
    reader.readAsText(file);
  };

  input.click();
}

export function saveFile() {
  let isContentChanged = false;

  document.getElementById('editor1').env.document.on('change', () => {
    isContentChanged = true;
  });

  if (!isContentChanged) {
    alert('変更がありません');
    return;
  }

  const text = document.getElementById('editor1').env.document.getValue();
  const blob = new Blob([text], { type: 'text/plain' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'output.inp';
  a.click();
  isContentChanged = false;
}
