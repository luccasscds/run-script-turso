# run script turso


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