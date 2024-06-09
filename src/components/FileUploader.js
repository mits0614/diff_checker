function readFile() {
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
            document.getElementById('textEdit').value = event.target.result;
        };
        reader.onerror = () => {
            alert('ファイルの読み込みに失敗しました');
        };
        reader.readAsText(file);
    };

    input.click();
}
