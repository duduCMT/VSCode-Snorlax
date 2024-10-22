# Gerador de Arquivos Personalizado

Caso você queira criar opções de menu no VSCode personalizadas que geram seus arquivos, basta seguir essa documentação.

### 1. Altere seu arquivo settings.json

Nesse exemplo, vamos criar opções personalizadas que irão aparecer ao clicar em `Snorlax -> Minhas Opções` e em `Snorlax -> React Native -> Minhas Opções`.

Em `Snorlax -> Minhas Opções` irá aparecer a opção "Criar Útils Typescript".
Em `Snorlax -> React Native -> Minhas Opções` irá aparecer as opções "Criar Class Component" e "Criar Arquivo de Navegação".

```json
{
	"snorlax.options": {
    "root": {
      "options": [
        {
          "generatorId": "createTypescriptUtils",
          "label": "Criar Útils Typescript",
        }
      ]
    },
    "react-native": {
      "options": [
        {
          "generatorId": "createClassComponent",
          "label": "Criar Class Component"
        },
        {
          "generatorId": "createNavigationFile",
          "label": "Criar Arquivo de Navegação"
        } 
      ]
    }
  }
}
```

- `generatorId` será o ID da geração que será executado ao clicar nessa opção. Confira a documentação completa do Snorlax Generator para entender como funciona a geração.
- `label` será o texto que irá aparecer no menu. Tambéms erá usado para identificar qual o tipo de Gerador deve ser Executado.

### 2. Adicionar os geradores em settings.json

Para executar o exemplo, adicione esses geradores no seu `settings.json` para testar:

```json
{
  "snorlax.generator": {
    "root": {
      "createTypescriptUtils": {
        "files": [
          {
            "extension": "tsx",
            "snippet": "exemple-create-typescript-utils"
          }
        ]
      },
    },
    "react-native": {
      "createComponent": {
        "files": [
          {
            "file": "index",
            "extension": "tsx",
            "snippet": "exemple-create-component"
          },
          {
            "file": "styles",
            "extension": "ts",
            "snippet": "exemple-create-styles"
          },
          {
            "file": "types",
            "extension": "d.ts",
            "snippet": "exemple-create-component-props"
          },
          {
            "file": "index",
            "extension": "stories.tsx",
            "snippet": "exemple-create-storybook-file"
          },
        ]
      },
      "createClassComponent": {
        "requestName": true,
        "files": [
          {
            "extension": "tsx",
            "snippet": "exemple-create-class-component"  
          }
        ]
      },
      "createNavigationFile": {
        "requestName": true,
        "files": [
          {
            "extension": "ts",
            "snippet": "exemple-create-navigation-file"  
          }
        ]
      }
    }
  },
}
```

Cada objeto em `snorlax.generator.[language].[commandId].files` pode ter os seguintes parâmetros:

- `extension`: Extensão do arquivo que será gerado. 
- `file`: Nome do arquivo que será gerado sem a extensão.
- `snippet`: Prefixo do snippet que será preenchido no arquivo.


