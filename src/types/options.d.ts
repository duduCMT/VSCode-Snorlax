type OptionSettings = {
  [key: string]: OptionLanguageSetting[];
};

type OptionLanguageSetting = {
  requestFileName?: boolean;
  options?: Option[];
};

type Option = {
  generatorId?: string;
  label?: string;
};

