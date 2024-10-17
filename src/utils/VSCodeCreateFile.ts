import * as vscode from 'vscode';
import { SnippetsUtils } from './SnippetsUtils';
import { OutputUtils } from './OutputUtils';

export class VSCodeCreateFile {
  constructor(private uri: vscode.Uri) {}

  createFromSnnipet = async (fileName: string, snippetLang: Language, prefix: string) => {
    const filePath = vscode.Uri.joinPath(this.uri, fileName);

    // Create file
    await vscode.workspace.fs.writeFile(filePath, Buffer.from(''));

    try {
      // Get snippet file content from language
      const snippets = SnippetsUtils.getGlobalSnippets(snippetLang);
    
      // Inset Snippet in new file
      const fileEditor = await vscode.window.showTextDocument(filePath);
      const currentSnippetBody = SnippetsUtils.getBodyFromSnippet(snippets, prefix);
      await fileEditor.insertSnippet(new vscode.SnippetString(currentSnippetBody));
    } catch(error) {
      OutputUtils.print(error);
    }
  }
}