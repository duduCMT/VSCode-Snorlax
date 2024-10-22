import * as vscode from 'vscode';

import os from "os";
import path from "path";
import fs from "fs";

export class SnippetsUtils {
  static getLocalSnippetsFolderPath = () => {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
      throw new Error("No open workspaces.");
    }
    return path.join(workspaceFolders[0].uri.fsPath, vscode.workspace.getConfiguration('files').get('userSnippetsFolder') || '.vscode');
  }

  static getGlobalSnippetsFolderPath = () => {
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

  static getExtentionSnippetsFolderPath = (context: vscode.ExtensionContext) => {
    return path.join(context.extensionPath, 'snippets');
  }

  static getSnippetFileName = (lang: Language) => {
    return `snorlax-${lang}.code-snippets`;
  }

  static getLocalSnippets = (lang: Language) => {
    const snippetsFolder = SnippetsUtils.getLocalSnippetsFolderPath();
    const fileName = SnippetsUtils.getSnippetFileName(lang);
    const snippetFile = path.join(snippetsFolder, fileName);

    if (fs.existsSync(snippetFile)) {
      const snippetFileContent = fs.readFileSync(snippetFile, 'utf8');
      const snippetJson = JSON.parse(snippetFileContent);
      return snippetJson as SnippetFileContent;
    } else {
      throw new Error(`${fileName} not found in local snippets.`);
    }
  }

  static getGlobalSnippets = (lang: Language) => {
    const snippetsFolder = SnippetsUtils.getGlobalSnippetsFolderPath();
    const fileName = SnippetsUtils.getSnippetFileName(lang);
    const snippetFile = path.join(snippetsFolder, fileName);

    if (fs.existsSync(snippetFile)) {
      const snippetFileContent = fs.readFileSync(snippetFile, 'utf8');
      const snippetJson = JSON.parse(snippetFileContent);
      return snippetJson as SnippetFileContent;
    } else {
      throw new Error(`${fileName} not found in global snippets.`);
    }
  }

  static getExtentionSnippets = (context: vscode.ExtensionContext, lang: Language) => {
    const snippetsFolder = SnippetsUtils.getExtentionSnippetsFolderPath(context);
    const fileName = SnippetsUtils.getSnippetFileName(lang);
    const snippetFile = path.join(snippetsFolder, fileName);

    if (fs.existsSync(snippetFile)) {
      const snippetFileContent = fs.readFileSync(snippetFile, 'utf8');
      const snippetJson = JSON.parse(snippetFileContent);
      return snippetJson as SnippetFileContent;
    } else {
      throw new Error(`${fileName} not found in extention snippets.`);
    }
  }

  static getBodyFromSnippet = (snippetContent: SnippetFileContent, prefix: string) => {
    if(snippetContent && snippetContent[prefix] && snippetContent[prefix].body) {
      const snippetString = snippetContent[prefix].body instanceof Array ? snippetContent[prefix].body.join('\n') : snippetContent[prefix].body;
      return snippetString as string;
    }
    return undefined;
  }
}
