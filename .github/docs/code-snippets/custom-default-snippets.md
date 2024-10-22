# Customize os Snippets padrões do Snorlax

Caso você queira alterar os Snippets padrão da extensão, basta criar um arquivo de snippet Global (User Snippet) ou local (Workspace) seguindo a seguinte nomeclatura de arquivo: `snorlax-[linguagem].code-snippets`. 


## Arquivos reconhecidos pelo Snorlax

- `snorlax-react-native.code-snippets`: Arquivo para buscar os snippets do menu Snorlax -> React Native
- `snorlax-myOptions.code-snippets`: Arquivo para buscar os snippets do menu Snorlax -> Minhas Opções

## No caso de snippets local (Workspace)

No caso de arquivos de snippets locais do projeto, eles devem ser criados seguindo os seguintes requisitos:

- Eles devem estar dentro da pasta `.vscode` na raiz do seu projeto.
- Eles devem seguir todas as regras de um arquivo `json`.

## Hierarquia de geração

Caso você tenha os mesmos snippets configurados em diferentes ambientes, o Snorlax irá considerar a seguinte hierarquia na geração:

1. Snippets Locais do Projeto (Workspace)
2. Snippets Globais do VS Code (User)
3. Snippets Padrões da Extensão (Snorlax)

## IMPORTANTE:

- É importante mantar o contúdo dos arquivos `code-snippets` como um `json` funcional, pois usando internamente o `JSON.parse()` para leitura do conteúdo.