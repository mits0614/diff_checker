let isContentChanged = false;

document.getElementById('textEdit').addEventListener('input', () => {
    isContentChanged = true;
});

function saveFile() {
    if (!isContentChanged) {
        alert('変更がありません');
        return;
    }

    const text = document.getElementById('textEdit').value;
    const blob = new Blob([text], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'output.inp';
    a.click();
    isContentChanged = false;
}
