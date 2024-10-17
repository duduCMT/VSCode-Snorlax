import * as vscode from 'vscode';
import { SnippetsUtils } from '../../../utils/SnippetsUtils';
import { OutputUtils } from '../../../utils/OutputUtils';
import { ReactNativeDefaultPrefix } from '../../../snippets/react-native';
import { VSCodeCreateFile } from '../../../utils/VSCodeCreateFile';


// Função para criar um componente
async function createComponent(uri: vscode.Uri) {
  const vsCodeFile = new VSCodeCreateFile(uri);
  const lang: Language = "react-native";

  await vsCodeFile.createFromSnnipet("index.tsx", lang, ReactNativeDefaultPrefix.COMPONENT);
  await vsCodeFile.createFromSnnipet("styles.ts", lang, ReactNativeDefaultPrefix.STYLES);
  await vsCodeFile.createFromSnnipet("types.d.ts", lang, ReactNativeDefaultPrefix.COMPONENT_PROPS);
}

// Exportar a função para uso em outros comandos
export { createComponent };
