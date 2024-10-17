import * as vscode from 'vscode';

import { createComponent, createScreen, test } from './commands/ReactNative';


export function activate(context: vscode.ExtensionContext) {
  let componentDisposable = vscode.commands.registerCommand('vscode-snorlax.react-native.createComponent', createComponent);
  let screenDisposable = vscode.commands.registerCommand('vscode-snorlaxe.react-native.createScreen', createScreen);
  let testDisposable = vscode.commands.registerCommand('vscode-snorlax.react-native.test', test);

  context.subscriptions.push(componentDisposable);
  context.subscriptions.push(screenDisposable);
  context.subscriptions.push(testDisposable);
}

export function deactivate() {}
