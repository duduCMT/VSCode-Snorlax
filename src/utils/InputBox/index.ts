import * as vscode from 'vscode';
import { InputBoxShowParams } from './types';

export class InputBox {
  static show = async ({ title, placeholder }: InputBoxShowParams) => {
    return await vscode.window.showInputBox({
      prompt: title,
      placeHolder: placeholder
  })
  }
}