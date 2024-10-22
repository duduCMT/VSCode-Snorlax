import * as vscode from 'vscode';

import path from "path";
import fs from "fs";

import { SnippetFolder } from './SnippetFolder';
import { SnippetFileContent } from './SnippetFileContentUtils';

export class SnippetFile {
  static getFileName = (lang: Language) => {
    return `snorlax-${lang}.code-snippets`;
  }

  static readLocalSnippets = (lang: Language): SnippetFileContent => {
    const snippetsFolder = SnippetFolder.getLocalPath();
    const fileName = SnippetFile.getFileName(lang);
    const snippetFile = path.join(snippetsFolder, fileName);

    if (fs.existsSync(snippetFile)) {
      const snippetFileContent = fs.readFileSync(snippetFile, 'utf8');
      const snippetJson = JSON.parse(snippetFileContent);
      return snippetJson as SnippetFileContent;
    } else {
      throw new Error(`${fileName} not found in local snippets.`);
    }
  }

  static readGlobalSnippets = (lang: Language): SnippetFileContent => {
    const snippetsFolder = SnippetFolder.getGlobalPath();
    const fileName = SnippetFile.getFileName(lang);
    const snippetFile = path.join(snippetsFolder, fileName);

    if (fs.existsSync(snippetFile)) {
      const snippetFileContent = fs.readFileSync(snippetFile, 'utf8');
      const snippetJson = JSON.parse(snippetFileContent);
      return snippetJson as SnippetFileContent;
    } else {
      throw new Error(`${fileName} not found in global snippets.`);
    }
  }

  static readExtentionSnippets = (context: vscode.ExtensionContext, lang: Language): SnippetFileContent => {
    const snippetsFolder = SnippetFolder.getExtentionPath(context);
    const fileName = SnippetFile.getFileName(lang);
    const snippetFile = path.join(snippetsFolder, fileName);

    if (fs.existsSync(snippetFile)) {
      const snippetFileContent = fs.readFileSync(snippetFile, 'utf8');
      const snippetJson = JSON.parse(snippetFileContent);
      return snippetJson as SnippetFileContent;
    } else {
      throw new Error(`${fileName} not found in extention snippets.`);
    }
  }
}
