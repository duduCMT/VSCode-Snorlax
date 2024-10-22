import { ReactNativeDefaultPrefix } from "../../../snippets/react-native";
import { Generator } from "../../../types/command";

export const CreateComponentGenerator: Generator = {
  id: "createComponent",
  files: [
    {
      file: "index",
      extension: "tsx",
      snippet: ReactNativeDefaultPrefix.COMPONENT,
    },
    {
      file: "styles",
      extension: "ts",
      snippet: ReactNativeDefaultPrefix.STYLES,
    }
  ],
}