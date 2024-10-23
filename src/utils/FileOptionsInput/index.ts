import { SnorlaxInputKeys } from "../../constants/SnorlaxKey";
import { SnorlaxKeyInputBoxParams } from "../../constants/SnorlaxKeyInputLabel";
import { FileOptions } from "../../types/generator";
import { SnorlaxInputKey } from "../../types/snorlax-key";
import { InputBox } from "../InputBox";
import { SnorlaxKeyUtils } from "../SnorlaxKeyUtils";
import { RequestInputsResult } from "./types";

export class FileOptionsInput {
  static requestInputs = async (fileOptions: FileOptions[]): Promise<RequestInputsResult> => {
    const inputsToRequest = FileOptionsInput.getInputsToRequest(fileOptions);

    const inputValues: RequestInputsResult = [];

    if(inputsToRequest && inputsToRequest.length > 0) {
      for (let index = 0; index < inputsToRequest.length; index++) {
        const inputKey = inputsToRequest[index];
        const value = await FileOptionsInput.requestInput(inputKey as SnorlaxInputKey);
        if(!value) {
          throw new Error("Not all input key values ​​were filled.");
        }
        inputValues.push({ key: inputKey, value })
      }
    }

    return inputValues;
  }

  private static requestInput = async (optionToRequest: SnorlaxInputKey) => {
    return InputBox.show(SnorlaxKeyInputBoxParams[optionToRequest]);
  }

  private static getInputsToRequest = (fileOptions: FileOptions[]): SnorlaxInputKey[] => {
    const optionsToRequest: SnorlaxInputKey[] = [];

    fileOptions.forEach(({ name, extension }) => {
      SnorlaxInputKeys.forEach(key => {
        if(
          SnorlaxKeyUtils.hasKeyInArray([ name, extension ], key) && 
          !optionsToRequest.find((optionKey) => optionKey === key)
        ) {
          optionsToRequest.push(key);    
        }
      });
    });

    return optionsToRequest;
  }
}