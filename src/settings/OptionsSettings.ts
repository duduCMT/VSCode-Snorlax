import * as vscode from 'vscode';

export class OptionsSettings {
  static getAll = () => {
    return vscode.workspace.getConfiguration("snorlax.options");
  }

  static getSettingsbyLanguage = (language: Language) => {
    const config = OptionsSettings.getAll();
    const langActions = config.get<OptionLanguageSetting>(language);
    return langActions;
  }

  static verifyOptions = (lang: Language) => {
    const settings = OptionsSettings.getSettingsbyLanguage(lang);

    if(!settings) return false;

    if(!settings.options) {
      throw new Error(`"snorlax.options.${lang}.options" not set.`);
    }

    for(var index = 0; index < settings["options"].length; index++) {
      const setting = settings["options"][index];
      if(!setting.generatorId) {
        throw new Error(`"snorlax.options.${lang}.options[${index}].generatorId" not set.`);
      }
      if(!setting.label) {
        throw new Error(`"snorlax.options.${lang}.options[${index}].label" not set.`);
      }
    }
    
    return true;
  } 

  static getOptions = (lang: Language): Option[] | undefined => {
    const settings = OptionsSettings.getSettingsbyLanguage(lang);

    if(!settings) return undefined;

    if(!settings.options) {
      throw new Error(`"snorlax.options.${lang}.options" not set.`);
    }
    
    return settings.options;
  } 
}