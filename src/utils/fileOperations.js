export const openFile = async () => {
    // ファイル選択ダイアログを表示する実装が必要です。
    // ブラウザのFile APIを利用する例を示します。
    return new Promise((resolve, reject) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.inp';
  
      input.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
          resolve(file);
        } else {
          reject('No file selected');
        }
      };
  
      input.click();
    });
  };
  
  export const saveFile = (file) => {
    // ファイル保存ダイアログを表示する実装が必要です。
    const url = URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'filename.inp';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  