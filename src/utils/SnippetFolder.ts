import * as vscode from 'vscode';

import os from "os";
import path from "path";

export class SnippetFolder {
  static getLocalPath = () => {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
      throw new Error("No open workspaces.");
    }
    return path.join(workspaceFolders[0].uri.fsPath, vscode.workspace.getConfiguration('files').get('userSnippetsFolder') || '.vscode');
  }

  static getGlobalPath = () => {
    const platform = os.platform();

    switch (platform) {
      case 'win32':
        if(process.env.APPDATA) {
          return path.join(process.env.APPDATA, 'Code', 'User', 'snippets');
        } else {
          throw new Error('Appdata not founded');
        }
      case 'darwin':
        return path.join(os.homedir(), 'Library', 'Application Support', 'Code', 'User', 'snippets');
      case 'linux':
        return path.join(os.homedir(), '.config', 'Code', 'User', 'snippets');
      default:
        throw new Error('Platform not supported');
    }
  }

  static getExtentionPath = (context: vscode.ExtensionContext) => {
    return path.join(context.extensionPath, 'snippets');
  }
}