import * as vscode from 'vscode';

import { reactNativeDisposebles } from './commands/ReactNative';
import { rootDisposebles } from './commands/Root';


export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(...reactNativeDisposebles);
  context.subscriptions.push(...rootDisposebles);
}

export function deactivate() {}
