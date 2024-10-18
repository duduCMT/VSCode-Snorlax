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

```

