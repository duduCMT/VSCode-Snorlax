import { GeneratorSettings } from "../../types/generator";
import { Generator } from "../../types/generator";

export class GeneratorSettingsUtils {
  static toGenerator = (input: GeneratorSettings): Generator[] => {
    return Object.entries(input).map(([id, value]) => ({
      id,
      files: value.files || [],
    }));
  }
}