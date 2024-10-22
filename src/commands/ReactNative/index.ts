import * as vscode from 'vscode';

import { createComponent } from './CreateComponent';
import { createScreen } from './CreateScreen';
import { myOptions } from './MyOptions';

export const reactNativeDisposebles = (context: vscode.ExtensionContext) => {
  return [
    vscode.commands.registerCommand('snorlax.react-native.createComponent', (uri) => createComponent(uri, context)),
    vscode.commands.registerCommand('snorlax.react-native.createScreen', (uri) => createScreen(uri)),
    vscode.commands.registerCommand('snorlax.react-native.myOptions', (uri) => myOptions(uri)),
  ];
}