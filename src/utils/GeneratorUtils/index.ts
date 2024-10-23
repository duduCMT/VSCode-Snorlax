import { GeneratorSettings } from "../../types/generator";
import { Generator } from "../../types/generator";

export class GeneratorUtils {
  static toGeneratorSettings = (input: Generator): GeneratorSettings => {
    return {
      [input.id]: {
        ...input,
      }
    }
  }
}