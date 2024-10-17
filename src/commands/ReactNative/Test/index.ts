import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import { SnippetsUtils } from '../../../utils/SnippetsUtils';
import { OutputUtils } from '../../../utils/OutputUtils';

export async function test(uri: vscode.Uri) {
  try {
    const snippets = SnippetsUtils.getGlobalSnippets("react-native");
    OutputUtils.print(snippets);
  } catch(error) {
    OutputUtils.print(error);
  }
}
