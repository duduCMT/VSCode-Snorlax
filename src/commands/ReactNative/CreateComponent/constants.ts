import { ReactNativeDefaultPrefix } from "../../../snippets/react-native";

export const CreateComponentCommandValue: CommandValues = {
  id: "createComponent",
  generatorDefaultSettings: [
    {
      file: "index.tsx",
      snippet: ReactNativeDefaultPrefix.COMPONENT,
    },
    {
      file: "styles.ts",
      snippet: ReactNativeDefaultPrefix.STYLES,
    },
    {
      file: "types.d.ts",
      snippet: ReactNativeDefaultPrefix.COMPONENT_PROPS,
    },
  ],
}