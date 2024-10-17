import * as vscode from 'vscode';
import { VSCodeCreateFile } from '../../../utils/VSCodeCreateFile';
import { GeneratorSettings } from '../../../settings/GeneratorSettings';
import { CreateComponentCommandValue } from './constants';

async function createComponent(uri: vscode.Uri) {
  const vsCodeFile = new VSCodeCreateFile(uri);
  const lang: Language = "react-native";

  let userSettingsOk = true;

  try {
    userSettingsOk = GeneratorSettings.verifyLangSetting(lang, CreateComponentCommandValue.id);
  } catch(error) {
    vscode.window.showErrorMessage(error as string);
    return;
  }

  const settings = GeneratorSettings.getLangSettings(lang);

  if(userSettingsOk && settings) {
    await vsCodeFile.createFilesFromSettings(settings, lang, CreateComponentCommandValue.id);  
    return;
  }

  await vsCodeFile.createFilesFromGeneratorSettings(CreateComponentCommandValue.generatorDefaultSettings, lang);  
}

export { createComponent };
