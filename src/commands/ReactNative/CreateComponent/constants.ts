import { ReactNativeDefaultPrefix } from "../../../snippets/react-native";
import { CommandValues } from "../../../types/command";

export const CreateComponentCommandValue: CommandValues = {
  id: "createComponent",
  generatorDefaultSettings: [
    {
      file: "index",
      extension: "tsx",
      snippet: ReactNativeDefaultPrefix.COMPONENT,
    },
    {
      file: "styles",
      extension: "ts",
      snippet: ReactNativeDefaultPrefix.STYLES,
    },
    {
      file: "types.d.ts",
      extension: ".d.ts",
      snippet: ReactNativeDefaultPrefix.COMPONENT_PROPS,
    },
  ],
}