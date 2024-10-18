type OptionSettings = {
  [key: string]: OptionLanguageSetting[];
};

type OptionLanguageSetting = {
  options?: Option[];
};

type Option = {
  generatorId?: string;
  label?: string;
};

