# Input Keys

Os Input Keys são chaves adicionadas ao seu `settings.json` para solicitar um determinado texto usando um Input Box ao usuário do VS Code. Por padrão, temos a opção **Snorlax &rarr; Typescript &rarr; New utils file**. Essa opção solicita ao usuário do VS Code o nome do arquivo antes da criação. Isso acontece pois um Input Key foi usado na definição do gerador daquele arquivo.

Aqui temos um exemplo de gerador que seta o nome de arquivo fixo:

```json
{
  "snorlax.generator": {
    "typescript": {
      "createUtilsClass": {
        "files": [
          {
            "name": "MyUtils.ts",
            "snippet": "snorlax-ts-utils"
          },
        ]
      }
    }
  }
}
```

Esse settings.json seta o nome fixo `MyUtils.ts` para o arquivo ao clicar na opção. Para solicitar o nome do arquivo, basta adicionar a chave de input `${INPUT_FILE_NAME}` ao `name` do arquivo. Dessa forma:

```json
{
  "snorlax.generator": {
    "typescript": {
      "createUtilsClass": {
        "files": [
          {
            "name": "${INPUT_FILE_NAME}.ts",
            "snippet": "snorlax-ts-utils"
          },
        ]
      }
    }
  }
}
```

Dessa forma, ao selecionar a opção, antes de criar o arquivo, o Snorlax vai solicitar o nome do arquivo ao usuário.

## Regras

### 1. Um `Input Key` para vários arquivos

Se o `generatorId.files` gerar mais de um arquivo. E um determinado Input Key se retetir em mais de um `file`, só será exibido um input para aquele Input Key. O valor informado pelo usuário será setado em todos os arquivos que estiverem com aquele Input Key. 

Por exemplo:

```json
{
  "snorlax.generator": {
    "typescript": {
      "createUtilsClass": {
        "files": [
          {
            "name": "${INPUT_FILE_NAME}.ts",
            "snippet": "snorlax-ts-util-file1"
          },
          {
            "name": "${INPUT_FILE_NAME}.ts",
            "snippet": "snorlax-ts-utils-file2"
          },
        ]
      }
    }
  }
}
````

Esse código não irá exibir dois Inputs, mais sim um único Input que irá preencher o valor no nome desses dois arquivos.

## Outros Inputs Keys

A depender do input key informado, outros tipos de mensagens do Input vão aparecer para o usuário. Segue a lista dos Input Keys existentes:

- `INPUT_FILE_NAME`: Recomendado para solicitar o nome de um arquivo.
- `INPUT_FOLDER_NAME`: Recomendado para solicitar o nome de uma pasta.


