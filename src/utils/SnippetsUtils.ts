import os from "os";
import path from "path";
import fs from "fs";
import { OutputUtils } from "./OutputUtils";

export class SnippetsUtils {
  static getGlobalSnippetsFolderPath = () => {
    const platform = os.platform();

    switch (platform) {
      case 'win32':
        if(process.env.APPDATA) {
          return path.join(process.env.APPDATA, 'Code', 'User', 'snippets');
        } else {
          throw new Error('Appdata not founded');
        }
      case 'darwin':
        return path.join(os.homedir(), 'Library', 'Application Support', 'Code', 'User', 'snippets');
      case 'linux':
        return path.join(os.homedir(), '.config', 'Code', 'User', 'snippets');
      default:
        throw new Error('Platform not supported');
    }
  }

  static getSnippetFileName = (lang: Language) => {
    return `snorlax-${lang}.code-snippets`;
  }

  static getGlobalSnippets = (lang: Language) => {
    const snippetsFolder = SnippetsUtils.getGlobalSnippetsFolderPath();
    const fileName = SnippetsUtils.getSnippetFileName(lang);
    const snippetFile = path.join(snippetsFolder, fileName);

    if (fs.existsSync(snippetFile)) {
      const snippetFileContent = fs.readFileSync(snippetFile, 'utf8');
      const snippetJson = JSON.parse(snippetFileContent);
      return snippetJson as SnippetFileContent;
    } else {
      throw new Error(`${fileName} not found in global snippets.`);
    }
  }

  static getBodyFromSnippet = (snippetContent: SnippetFileContent, prefix: string) => {
    if(snippetContent && snippetContent[prefix] && snippetContent[prefix].body) {
      const snippetString = snippetContent[prefix].body instanceof Array ? snippetContent[prefix].body.join('\n') : snippetContent[prefix].body;
      return snippetString as string;
    }
    return undefined;
  }
}
