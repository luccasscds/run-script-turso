# run script turso
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/luccasscds/run-script-turso/node.js.yml?branch=main&logo=nodedotjs&label=Build&labelColor=black)
![Static Badge](https://img.shields.io/badge/dependabot-alerts?logo=dependabot)
![GitHub package.json version](https://img.shields.io/github/package-json/v/luccasscds/run-script-turso)
![GitHub repo size](https://img.shields.io/github/repo-size/luccasscds/run-script-turso)

## Configurar as variáveis do arquivo `.env`:
Coloque as informações de acordo com a variável.
```sh
URL_DATABASE='libsql://database-username.turso.io'
URL_TOKEN_DATABASE='xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
SHOW_APPLICATION_MENU='true' -- opcional
```

> Para inforamação https://docs.turso.tech/sdk/ts/quickstart


## Gerar um `.exe` para Windows
```sh
npm install && npm run package
```
