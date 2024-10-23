import { FileOptions } from "../types/generator";

import { FileOptionsInput } from './FileOptionsInput';
import { SnorlaxKeyUtils } from './SnorlaxKeyUtils';

export class FileOptionsProcess {
  static async execute(fileOptions: FileOptions[]): Promise<FileOptions[]> {
    const inputsValues = await FileOptionsInput.requestInputs(fileOptions);

    const fileOptionsFormattedFromInputs = fileOptions.map((fileOption) => {
      const name = SnorlaxKeyUtils.replaceKeys(fileOption.name,inputsValues);
      const extension = fileOption.extension && SnorlaxKeyUtils.replaceKeys(fileOption.extension,inputsValues);
      
      return {
        ...fileOption,
        name, 
        extension,
      }
    });

    return fileOptionsFormattedFromInputs;
  }
}