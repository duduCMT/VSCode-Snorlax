import { SnorlaxKey } from "../types/snorlax-key";

export class SnorlaxKeyUtils {
  static replaceKeys = (input: string, keyValues: Array<{ key: SnorlaxKey, value: string }>) => {
    let finalValue = input;
    keyValues.forEach(({ key, value }) => {
      finalValue = SnorlaxKeyUtils.replaceKey(finalValue, key, value);
    });
    return finalValue;
  }

  static replaceKey = (input: string, key: SnorlaxKey, value: string) => {
    const regex = new RegExp(`\\$\\{${key}\\}`, 'g');
    return input.replace(regex, value);
  }

  static hasKey = (input: string | undefined, key: SnorlaxKey) => {
    if(!input) return false;
    const regex = new RegExp(`\\$\\{${key}\\}`, 'g');
    return regex.test(input);
  }

  static hasKeyInArray = (inputs: Array<string | undefined>, key: SnorlaxKey) => {
    for (let index = 0; index < inputs.length; index++) {
      const input = inputs[index];
      if(SnorlaxKeyUtils.hasKey(input, key)) {
        return true;
      }
    } 
      
    return false;
  }
}