import * as vscode from 'vscode';

import { FileOptions, GeneratorSettings } from '../types/generator';
import { SnippetFile } from './SnippetFile';
import { SnippetFileContentUtils } from './SnippetFileContentUtils';

export class VSCodeCreateFile {
  constructor(private context: vscode.ExtensionContext, private uri: vscode.Uri) {}

  private getFileName = (name: string, extension?: string) => {
    return name && extension ? `${name}.${extension}` : name;
  }

  createFromSnippet = async (fileName: string, snippetLang: Language, prefix: string) => {
    try {
      await this.createFromLocalSnippets(fileName, snippetLang, prefix);
      return;
    } catch(error) {
      console.log(error);
      // No local snippets
    }

    try {
      await this.createFromGlobalSnippets(fileName, snippetLang, prefix);
      return;
    } catch(error) {
      // No global snippets
    }
    
    await this.createFromExtentionSnippets(fileName, snippetLang, prefix);
    return;
  }

  private createFromLocalSnippets = async (fileName: string, snippetLang: Language, prefix: string) => {
    const filePath = vscode.Uri.joinPath(this.uri, fileName);

    const snippets = SnippetFile.readLocalSnippets(snippetLang);

    if(!snippets) throw new Error(`No snippet files found to lang ${snippetLang} in workspace file ${filePath.toString()}`);

    // Create file to user
    await vscode.workspace.fs.writeFile(filePath, Buffer.from(''));

    // Get snippet body
    const currentSnippetBody = SnippetFileContentUtils.getBody(snippets, prefix);
    if(!currentSnippetBody) throw new Error(`No snippet body to prefix "${prefix}" in workspace file ${filePath.toString()}`);

    // Inset Snippet in new file
    const fileEditor = await vscode.window.showTextDocument(filePath);
    await fileEditor.insertSnippet(new vscode.SnippetString(currentSnippetBody));

    // Save file
    await fileEditor.document.save();
  }

  private createFromGlobalSnippets = async (fileName: string, snippetLang: Language, prefix: string) => {
    const filePath = vscode.Uri.joinPath(this.uri, fileName);

    const snippets = SnippetFile.readGlobalSnippets(snippetLang);;

    if(!snippets) throw new Error(`No snippet files found to lang ${snippetLang} in user global file ${filePath.toString()}`);

    // Create file to user
    await vscode.workspace.fs.writeFile(filePath, Buffer.from(''));

    // Get snippet body
    const currentSnippetBody = SnippetFileContentUtils.getBody(snippets, prefix);
    if(!currentSnippetBody) throw new Error(`No snippet body to prefix "${prefix}" in user global file ${filePath.toString()}`);

    // Inset Snippet in new file
    const fileEditor = await vscode.window.showTextDocument(filePath);
    await fileEditor.insertSnippet(new vscode.SnippetString(currentSnippetBody));

    // Save file
    await fileEditor.document.save();
  }

  private createFromExtentionSnippets = async (fileName: string, snippetLang: Language, prefix: string) => {
    const filePath = vscode.Uri.joinPath(this.uri, fileName);

    const snippets = SnippetFile.readExtentionSnippets(this.context, snippetLang);;

    if(!snippets) throw new Error(`No snippet files found to lang ${snippetLang} in extention file ${filePath.toString()}`);

    // Create file to user
    await vscode.workspace.fs.writeFile(filePath, Buffer.from(''));

    // Get snippet body
    const currentSnippetBody = SnippetFileContentUtils.getBody(snippets, prefix);
    if(!currentSnippetBody) throw new Error(`No snippet body to prefix "${prefix}" in extention file ${filePath.toString()}`);

    // Inset Snippet in new file
    const fileEditor = await vscode.window.showTextDocument(filePath);
    await fileEditor.insertSnippet(new vscode.SnippetString(currentSnippetBody));

    // Save file
    await fileEditor.document.save();
  }

  createFilesFromSettings = async (settings: GeneratorSettings, lang: Language, configurationId: string) => {    
    // If user settings have files configuration to configuration id, make files
    if(settings && settings[configurationId] && settings[configurationId].files) {
      for(var index = 0; index < settings[configurationId].files.length; index++) {
        const fileSetting = settings[configurationId].files[index];
        
        if(!fileSetting.snippet || !fileSetting.name) {
          vscode.window.showErrorMessage(`Has a error in "${lang}.${configurationId}". Files not created.`);
          return;
        }
        const fileName = this.getFileName(fileSetting.name, fileSetting.extension);
        await this.createFromSnippet(fileName, lang, fileSetting.snippet);
        vscode.window.showInformationMessage(`Files created successfully from User "settings.json"`);
      }
    }
  }

  createFilesFromExtentionSettings = async (settings: FileOptions[], lang: Language) => {    
    for(var index = 0; index < settings.length; index++) {
      const fileSetting = settings[index];
      if(!fileSetting.snippet || !fileSetting.name) {
        vscode.window.showErrorMessage(`Internal error in the Snorlax. GeneratorSettings from "${lang} not defined correctly."`);
        return;
      }
      const fileName = this.getFileName(fileSetting.name, fileSetting.extension);
      await this.createFromSnippet(fileName, lang, fileSetting.snippet);
    }
  }
}