import { ReactNativeDefaultPrefix } from "../../../snippets/react-native";
import { Generator } from "../../../types/command";

export const CreateComponentGenerator: Generator = {
  id: "createComponent",
  files: [
    {
      name: "index",
      extension: "tsx",
      snippet: ReactNativeDefaultPrefix.COMPONENT,
    },
    {
      name: "styles",
      extension: "ts",
      snippet: ReactNativeDefaultPrefix.STYLES,
    }
  ],
}