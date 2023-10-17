# Hotel API 1.0.0

Hotel API é um sistema que simula as funcionalidades essenciais para um hotel
Principais objetivos:

- CRUD de quartos (room)
- CRUD de hóspedes (guest)
- CRUD de reservas (reserve)

Initially appeared on
[gist](https://github.com/luizgustavo90/hotel-api).

## Inicializando a aplicação

Para iniciar a aplicação, primeiro de tudo você deve ter o node_modules instalando com "npm i", próximo passo é deixar configurado o .env coma as configurações de banco de dados e demais informações específicas da aplicação (por favor verificar .env.example).

### Estilo de teste

Para teste, foi utilizado o Postman para estresse da aplicação, testando todas as rotas e chamadas incluindo o forçamento de erros.

- Detalhes em : src/docs/
  Futuramente, será implementado o teste com jest para 100% dos controllers

## Deployment

N/A

## Ferramentas utilizadas

- Github: armazenamento do repositório e gerenciamento do projeto
- Vscode: editor de texto tanto para a api do back-end quanto para o front-end
- MySQL: Banco de dados para o armazenamento das informações
- NodeJs/Typescript: utilizada para a linguagem tanto do back-end quanto do front-end

## Versionamento

Versão: 1.0.0

## Authores

Luiz Gustavo Souza: Back-end
