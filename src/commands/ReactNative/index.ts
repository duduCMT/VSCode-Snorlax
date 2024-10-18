import * as vscode from 'vscode';

import { createComponent } from './CreateComponent';
import { createScreen } from './CreateScreen';
import { myOptions } from './MyOptions';

export const reactNativeDisposebles = [
  vscode.commands.registerCommand('vscode-snorlax.react-native.createComponent', createComponent),
  vscode.commands.registerCommand('vscode-snorlax.react-native.createScreen', createScreen),
  vscode.commands.registerCommand('vscode-snorlax.react-native.myOptions', myOptions),
];