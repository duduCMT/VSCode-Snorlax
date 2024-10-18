import * as vscode from 'vscode';
import { OptionsSettings } from '../settings/OptionsSettings';

export class OptionsUtils {
  static async execute(uri: vscode.Uri, lang: Language) {
    let optionsIsOk = true;

    try {
      optionsIsOk = OptionsSettings.verifyOptions(lang);
    } catch(error) {
      vscode.window.showErrorMessage(error as string);
      return;
    }

    const options = OptionsSettings.getOptions(lang);

    if(!options) {
      vscode.window.showInformationMessage('No options configured in "settings.json"');
      return;
    }

    const optionLabels = options.map(option => option.label!);

    const selectedOption = await vscode.window.showQuickPick(optionLabels, {
      placeHolder: 'Escolha uma opção',
    });

    if (selectedOption) {
      console.log(`Você selecionou: ${selectedOption}`);
      vscode.window.showInformationMessage(`Você selecionou: ${selectedOption}`);
    }
  }
}