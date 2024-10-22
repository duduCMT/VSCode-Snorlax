export type GeneratorSettings = {
  [key: string]: GeneratorLanguageSetting;
};

type GeneratorLanguageSetting = {
  requestName?: boolean;
  files?: FileOptions[];
};

type FileOptions = {
  name: string;
  extension?: string;
  snippet?: string;
}

interface Generator {
  id: string;
  files: FileOptions[];
}