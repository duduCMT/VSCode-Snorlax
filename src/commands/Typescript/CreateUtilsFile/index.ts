import * as vscode from 'vscode';

import { VSCodeCreateFile } from '../../../utils/VSCodeCreateFile';
import { GeneratorSettings } from '../../../settings/GeneratorSettings';
import { CreateUtilsFileGenerator } from './Generator';
import { FileOptions } from '../../../types/generator';
import { FileOptionsProcess } from '../../../utils/FileOptionsProcess';


async function createUtilsFile(uri: vscode.Uri, context: vscode.ExtensionContext) {
  const vsCodeFile = new VSCodeCreateFile(context, uri);
  const lang: Language = "typescript";

  let userSettingsOk = true;

  try {
    userSettingsOk = GeneratorSettings.verifyLangSetting(lang, CreateUtilsFileGenerator.id);
  } catch(error) {
    vscode.window.showErrorMessage(error as string);
    return;
  }

  try {
    let fileOptions: FileOptions[] = [];
    const userLangSettings = userSettingsOk ? GeneratorSettings.getLangSettings(lang) : undefined;

    if(userLangSettings && userLangSettings[CreateUtilsFileGenerator.id]) {
      const files = userLangSettings[CreateUtilsFileGenerator.id].files;
      if(files && files.length > 0) {
        fileOptions = files;
      } else {
        fileOptions = CreateUtilsFileGenerator.files;
      }
    } else {
      fileOptions = CreateUtilsFileGenerator.files;
    }

    const finalFileOptions = await FileOptionsProcess.execute(fileOptions);

    await vsCodeFile.createFilesFromFileOptions(finalFileOptions, lang);  
    
  } catch(error) {
    vscode.window.showErrorMessage(error as string);
    return;
  }
}

export { createUtilsFile };
