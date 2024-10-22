import * as vscode from 'vscode';
import { VSCodeCreateFile } from '../../../utils/VSCodeCreateFile';
import { GeneratorSettings } from '../../../settings/GeneratorSettings';
import { CreateComponentGenerator } from './CreateComponentGenerator';

async function createComponent(uri: vscode.Uri, context: vscode.ExtensionContext) {
  const vsCodeFile = new VSCodeCreateFile(context, uri);
  const lang: Language = "react-native";

  let userSettingsOk = true;

  try {
    userSettingsOk = GeneratorSettings.verifyLangSetting(lang, CreateComponentGenerator.id);
  } catch(error) {
    vscode.window.showErrorMessage(error as string);
    return;
  }


  try {
    const settings = GeneratorSettings.getLangSettings(lang);

    if(userSettingsOk && settings) {
      await vsCodeFile.createFilesFromSettings(settings, lang, CreateComponentGenerator.id);  
      return;
    }

    await vsCodeFile.createFilesFromExtentionSettings(CreateComponentGenerator.files, lang);  
  } catch(error) {
    vscode.window.showErrorMessage(error as string);
    return;
  }
}

export { createComponent };
