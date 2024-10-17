type GeneratorSettings = {
  file?: string;
  snippet?: string;
};

type LanguageGeneratorActions = {
  [key: string]: GeneratorSettings[];
};