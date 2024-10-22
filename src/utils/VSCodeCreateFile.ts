import * as vscode from 'vscode';
import { SnippetsUtils } from './SnippetsUtils';
import { OutputUtils } from './OutputUtils';
import { FileOptions, GeneratorLanguageSetting, GeneratorSettings } from '../types/generator';

export class VSCodeCreateFile {
  constructor(private context: vscode.ExtensionContext, private uri: vscode.Uri) {}

  createFromSnippet = async (fileName: string, snippetLang: Language, prefix: string) => {
    try {
      await this.createFromGlobalSnippets(fileName, snippetLang, prefix);
      return;
    } catch(error) {
      // No global setting;
    }
    
    await this.createFromExtentionSnippets(fileName, snippetLang, prefix);
    return;
  }

  private createFromGlobalSnippets = async (fileName: string, snippetLang: Language, prefix: string) => {
    const filePath = vscode.Uri.joinPath(this.uri, fileName);

    const snippets = SnippetsUtils.getGlobalSnippets(snippetLang);;

    if(!snippets) throw new Error(`No snippet files found to lang ${snippetLang} in global file ${filePath.toString()}`);

    // Create file to user
    await vscode.workspace.fs.writeFile(filePath, Buffer.from(''));

    // Get snippet body
    const currentSnippetBody = SnippetsUtils.getBodyFromSnippet(snippets, prefix);
    if(!currentSnippetBody) throw new Error(`No snippet body to prefix "${prefix}" in global file ${filePath.toString()}`);

    // Inset Snippet in new file
    const fileEditor = await vscode.window.showTextDocument(filePath);
    await fileEditor.insertSnippet(new vscode.SnippetString(currentSnippetBody));

    // Save file
    await fileEditor.document.save();
  }

  private createFromExtentionSnippets = async (fileName: string, snippetLang: Language, prefix: string) => {
    const filePath = vscode.Uri.joinPath(this.uri, fileName);

    const snippets = SnippetsUtils.getExtentionSnippets(this.context, snippetLang);;

    if(!snippets) throw new Error(`No snippet files found to lang ${snippetLang} in extention file ${filePath.toString()}`);

    // Create file to user
    await vscode.workspace.fs.writeFile(filePath, Buffer.from(''));

    // Get snippet body
    const currentSnippetBody = SnippetsUtils.getBodyFromSnippet(snippets, prefix);
    if(!currentSnippetBody) throw new Error(`No snippet body to prefix "${prefix}" in extention file ${filePath.toString()}`);

    // Inset Snippet in new file
    const fileEditor = await vscode.window.showTextDocument(filePath);
    await fileEditor.insertSnippet(new vscode.SnippetString(currentSnippetBody));

    // Save file
    await fileEditor.document.save();
  }

  createFilesFromSettings = async (settings: GeneratorSettings, lang: Language, configurationId: string, fileName?: string) => {    
    // If user settings have files configuration to configuration id, make files
    if(settings && settings[configurationId] && settings[configurationId].files) {
      for(var index = 0; index < settings[configurationId].files.length; index++) {
        const setting = settings[configurationId].files[index];
        setting.file = setting.file || fileName;
        if(!setting.snippet || !setting.extension) {
          vscode.window.showErrorMessage(`Has a error in "${lang}.${configurationId}". Files not created.`);
          return;
        }
        await this.createFromSnippet(`${setting.file}.${setting.extension}`, lang, setting.snippet);
        vscode.window.showInformationMessage(`Files created successfully from User "settings.json"`);
      }
    }
  }

  createFilesFromExtentionSettings = async (settings: FileOptions[], lang: Language) => {    
    for(var index = 0; index < settings.length; index++) {
      const setting = settings[index];
      if(!setting.snippet || !setting.extension) {
        vscode.window.showErrorMessage(`Internal error in the Snorlax. GeneratorSettings from "${lang} not defined correctly."`);
        return;
      }
      await this.createFromSnippet(`${setting.file}.${setting.extension}`, lang, setting.snippet);
      vscode.window.showInformationMessage(`Default files created successfully."`);
    }
  }
}