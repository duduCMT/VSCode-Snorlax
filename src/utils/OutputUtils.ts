import * as vscode from 'vscode';

export const OUTPUT_CHANNEL = "Snorlax";
const outputChannel = vscode.window.createOutputChannel(OUTPUT_CHANNEL);

export class OutputUtils {
  static print(value: any) {
    outputChannel.append(value);
    outputChannel.show(true);
  }
}