export type GeneratorSettings = {
  [key: string]: GeneratorLanguageSetting;
};

type GeneratorLanguageSetting = {
  requestName?: boolean;
  files?: FileOptions[];
};

type FileOptions = {
  file?: string;
  extension?: string;
  snippet?: string;
}