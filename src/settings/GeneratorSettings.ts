import * as vscode from 'vscode';

export class GeneratorSettings {
  static getAll = () => {
    return vscode.workspace.getConfiguration("snorlax.generator");
  }

  static getLangSettings = (language: Language) => {
    const config = GeneratorSettings.getAll();
    const langActions = config.get<LanguageGeneratorActions>(language);
    return langActions;
  }

  static verifyLangSetting = (lang: Language, settingId: string) => {
    const settings = GeneratorSettings.getLangSettings(lang);

    if(!settings) return false;

    if(settings[settingId]) {
      for(var index = 0; index < settings[settingId].length; index++) {
        const setting = settings[settingId][index];
        if(!setting.file) {
          throw new Error(`"${lang}.${settingId}[${index}].file" not set.`);
        }
        if(!setting.snippet) {
          throw new Error(`"${lang}.${settingId}[${index}].snippet" not set.`);
        }
      }
    }

    return true;
  } 
}