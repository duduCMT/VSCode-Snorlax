import * as vscode from 'vscode';
import { OptionsSettings } from '../../../settings/OptionsSettings';
import { OptionsUtils } from '../../../utils/OptionsUtils';

async function myOptions(uri: vscode.Uri) {
  await OptionsUtils.execute(uri, "root");
}

export { myOptions };
