import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export async function createScreen(uri: vscode.Uri) {
  const folderPath = uri.fsPath;

  const screenFilePath = path.join(folderPath, 'index.tsx');

  if (fs.existsSync(screenFilePath)) {
    vscode.window.showErrorMessage('O arquivo index.tsx já existe nessa pasta!');
    return;
  }

  fs.writeFileSync(screenFilePath, '');

  const screenDocument = await vscode.workspace.openTextDocument(screenFilePath);
  await vscode.window.showTextDocument(screenDocument);
  await vscode.commands.executeCommand('editor.action.insertSnippet', { name: 'rnscreen' });

  vscode.window.showInformationMessage('Tela index.tsx criada com sucesso!');
}
