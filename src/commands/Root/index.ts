import * as vscode from 'vscode';
import { myOptions } from './MyOptions';

export const rootDisposebles = [
  vscode.commands.registerCommand('vscode-snorlax.myOptions', myOptions),
];