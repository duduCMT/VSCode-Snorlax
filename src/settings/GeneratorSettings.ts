import * as vscode from 'vscode';
import { GeneratorSettings as GeneratorSettingsType } from "../types/generator"

export class GeneratorSettings {
  static getAll = () => {
    return vscode.workspace.getConfiguration("snorlax.generator");
  }

  static getLangSettings = (language: Language) => {
    const config = GeneratorSettings.getAll();
    const langActions = config.get<GeneratorSettingsType>(language);
    return langActions;
  }

  static verifyLangSetting = (lang: Language, settingId: string) => {
    const settings = GeneratorSettings.getLangSettings(lang);

    if(!settings) return false;

    if(!settings[settingId]) throw new Error(`"${lang}.${settingId}" not set.`); 

    if(!settings[settingId].files) throw new Error(`"${lang}.${settingId}.files" not set.`); 

    for(var index = 0; index < settings[settingId].files.length; index++) {
      const file = settings[settingId].files[index];
      if(!file.name) {
        throw new Error(`"${lang}.${settingId}.files[${index}].name" not set.`);
      }
      if(!file.snippet) {
        throw new Error(`"${lang}.${settingId}.files[${index}].snippet" not set.`);
      }
    }
  
    return true;
  } 
}