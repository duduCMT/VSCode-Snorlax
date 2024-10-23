import * as vscode from 'vscode';
import { createUtilsFile } from './CreateUtilsFile';


export const typescriptDisposebles = (context: vscode.ExtensionContext) => {
  return [
    vscode.commands.registerCommand('snorlax.typescript.createUtilsFile', (uri) => createUtilsFile(uri, context)),
  ];
}