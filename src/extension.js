const vscode = require('vscode');

function activate(context) {
  let disposable = vscode.commands.registerCommand('extension.copyUnixPath', function () {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      let filePath = editor.document.uri.fsPath;

      // Convert backslashes to forward slashes
      filePath = filePath.replace(/\\/g, '/');

      // Convert drive letter (e.g., C:) to Unix-style (/c/)
      filePath = filePath.replace(/^([a-zA-Z]):/, (_, drive) => `/${drive.toLowerCase()}`);

      vscode.env.clipboard.writeText(filePath).then(() => {
        vscode.window.showInformationMessage('Unix-style path copied to clipboard!');
      });
    }
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
