import { SnippetFileContent } from '../types/snippet';

export class SnippetFileContentUtils {
  static getBody = (snippetContent: SnippetFileContent, prefix: string) => {
    if(snippetContent && snippetContent[prefix] && snippetContent[prefix].body) {
      const snippetString = snippetContent[prefix].body instanceof Array ? snippetContent[prefix].body.join('\n') : snippetContent[prefix].body;
      return snippetString as string;
    }
    return undefined;
  }
}