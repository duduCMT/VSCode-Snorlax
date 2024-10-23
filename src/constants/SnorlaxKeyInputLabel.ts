import { SnorlaxInputKey } from "../types/snorlax-key";
import { InputBoxShowParams } from "../utils/InputBox/types";

export const SnorlaxKeyInputBoxParams: Record<SnorlaxInputKey, InputBoxShowParams> = {
  INPUT_FILE_NAME: { title: "Enter the file name" },
  INPUT_FOLDER_NAME: { title: "Enter the folder name" },
};