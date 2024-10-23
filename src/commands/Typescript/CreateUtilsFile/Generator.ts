import { TypescriptDefaultPrefix } from "../../../snippets/typescript";
import { Generator } from "../../../types/command";

export const CreateUtilsFileGenerator: Generator = {
  id: "createUtilsFile",
  files: [
    {
      name: "${INPUT_FILE_NAME}",
      extension: "ts",
      snippet: TypescriptDefaultPrefix.UTILS,
    }
  ],
}